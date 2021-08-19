// @flow
import * as React from "react";
import { Grid, Segment } from "semantic-ui-react";
// router //
import { useRouteMatch, useHistory, Route, Switch } from "react-router-dom";
// redux actions //
import { connect } from "react-redux";
// additional components //
import { handleFetchNewsPosts, handleCreateNewsPost, handleUpdateNewsPost, handleToggleNewsPostLiveStatus, handleDeleteNewsPost, handleOpenNewsPost, handleCloseNewsPost, setNewsPostError } from "../../../redux/actions/newsPostActions";
import { ConfirmDeleteModal} from "../shared/ConfirmDeleteModal";
import { PostsControls } from "./PostsControls";
import { PostForm } from "./PostForm";
import { NewsPostCard } from "./cards/NewsPostCard";
import { NewsPostPreviewCard } from "./cards/NewsPostPreviewCard";
import { ViewAllPosts } from "./view_all/ViewAllPosts";
// types //
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { NewsPostAction, NewsPostsState, NewsPostData, ClientNewsPostFormData } from "../../../redux/reducers/news_posts/flowTypes";
// styles //
import styles from "./css/postsIndexContainer.module.css";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";

type LocalState = {
  newsPostFormOpen: boolean;
  updateForm: boolean;
  editorTitle: string;
  editorText: string;
}
type ConfirmDeleteModalState = {
  modalOpen: boolean;
  modelName: "news post" | "";
  modelId: string;
}

type WrapperProps = {

};
type Props = {
  ...WrapperProps;
  newsPostsState: NewsPostsState;
  _handleFetchNewsPosts: (options?: any) => Promise<boolean>;
  _handleCreateNewsPost: (data: ClientNewsPostFormData, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleUpdateNewsPost: (data: NewsPostData, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleToggleNewsPostOnlineStatus: (data: NewsPostData, NewsPostsState) => Promise<boolean>;
  _handleDeleteNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => void;
  _handleCloseNewsPost: () => void;
};

const PostsIndexContainer = ({ _handleFetchNewsPosts, _handleCreateNewsPost, _handleUpdateNewsPost, _handleToggleNewsPostOnlineStatus, _handleDeleteNewsPost, _handleOpenNewsPost, _handleCloseNewsPost, newsPostsState }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ viewAll: false, newsPostFormOpen: false, updateForm: false, editorTitle: "", editorText: "" });
  const [ confirmDeleteModalState, setConfirmDeleteModalState ] = React.useState<ConfirmDeleteModalState>({ modalOpen: false, modelName: "", modelId: "" });

  const lastPost = React.useRef<NewsPostData>(newsPostsState.newsPostData);

  const history = useHistory();
  const { path, url } = useRouteMatch();

  const handleOpenNewsPostForm = (): void => {
    if (history.location.pathname !== "/admin/posts") history.push("/admin/posts");
    if (!objectValuesEmpty(newsPostsState.newsPostData)) _handleCloseNewsPost();
    setLocalState({ newsPostFormOpen: true, updateForm: false, editorTitle: "", editorText: "" });
  };
  const handleOpenEditNewsPost = (): void => {
    const { title, content } = newsPostsState.newsPostData;
    if (history.location.pathname !== "/admin/posts") history.push("/admin/posts");
    setLocalState({ newsPostFormOpen: true, updateForm: true, editorTitle: title, editorText: content });
  };

  const handleTitleChange = (e: any) => {
    setLocalState({ ...localState, editorTitle: e.target.value });
  };
  const handleUpdateEditorChange = (editor: any) => {
    setLocalState({ ...localState, editorText: editor.getData() });
  };

  const handleSavePost = (): Promise<boolean> => {
    if(objectValuesEmpty(newsPostsState.newsPostData)) {
      // new post is being created //
      const newPost: ClientNewsPostFormData = {
        createdBy: "Administrator",
        title: localState.editorTitle,
        content: localState.editorText
      };
      return _handleCreateNewsPost(newPost, newsPostsState)
        .then((success) => {
          if(success) setLocalState({ newsPostFormOpen: false, updateForm: false, editorTitle: "", editorText: "" });
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    } else {
      const editedPost: NewsPostData = {
        ...newsPostsState.newsPostData,
        title: localState.editorTitle,
        content: localState.editorText
      };
      return _handleUpdateNewsPost(editedPost, newsPostsState)
        .then((success) => {
          if(success) setLocalState({ newsPostFormOpen: false, updateForm: false, editorTitle: "", editorText: "" });
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  };

  const handleToggleNewsPost = (newsPostId: string): void => {
    if (localState.newsPostFormOpen) setLocalState({ ...localState, newsPostFormOpen: false });
    _handleOpenNewsPost(newsPostId, newsPostsState);
  };
  const handleCancelPost = (): void => {
    if (objectValuesEmpty(newsPostsState.newsPostData)) {
      setLocalState({ ...localState, newsPostFormOpen: false, editorTitle: "", editorText: "" });
    } else {
      _handleCloseNewsPost();
      setLocalState({ ...localState, newsPostFormOpen: false, editorTitle: "", editorText: "" });
    }
  };

  // toggle news post online status //
  const toggleNewsPostLiveStatus = (): Promise<boolean> => {
    return _handleToggleNewsPostOnlineStatus(newsPostsState.newsPostData, newsPostsState);
  };

  // delete functionality withh confirm modal popup //
  const triggerDeleteNewsPost = (): void => {
    const { _id } = newsPostsState.newsPostData;
    setConfirmDeleteModalState({ modalOpen: true, modelName: "news post", modelId: _id });
  };
  const cancelDeleteNewsPost = (): void => {
    setConfirmDeleteModalState({ modalOpen: false, modelName: "", modelId: "" });
  };
  const confirmDeleteNewsPost = (): Promise<boolean> => {
    const { _id } = newsPostsState.newsPostData;
    return _handleDeleteNewsPost(_id, newsPostsState)
      .then((success) => {
        if (success) {
          setConfirmDeleteModalState({ modalOpen: false, modelId: "", modelName: "" });
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      })
  };

  // lifecycle //
  React.useEffect(() => {
    _handleFetchNewsPosts();
  }, []);

  React.useEffect(() => {
    if(history.location.pathname.includes("view_all/") && objectValuesEmpty(newsPostsState.newsPostData)) {
      history.push("/admin/posts");
    }
  }, [ history.location.pathname ]);

  /*
  React.useEffect(() => {
    if (!objectValuesEmpty(newsPostsState.newsPostData) && localState.newsPostFormOpen) {
      console.log("this has been called")
      setLocalState({ ...localState, editorTitle: newsPostsState.newsPostData.title, editorText: newsPostsState.newsPostData.content })
    }
  }, [ newsPostsState, localState.newsPostFormOpen, localState.updateForm ]);
  */

  return (
    <React.Fragment>
      <ConfirmDeleteModal open={ confirmDeleteModalState.modalOpen} modelName="news post" confirmAction={ confirmDeleteNewsPost } cancelAction={ cancelDeleteNewsPost }/>
      <Grid.Row style={{ height: "60px", display: "flex", alignItems: "center", padding: 0, border: "3px solid green" }}>
        <PostsControls 
          formOpen={ localState.newsPostFormOpen }
          newPost={ objectValuesEmpty(newsPostsState.newsPostData) } 
          handleOpenNewPostForm={ handleOpenNewsPostForm } 
          handleSavePost={ handleSavePost }
          handleCancelPost={ handleCancelPost }
          handleDeletePost={ triggerDeleteNewsPost }
        />
      </Grid.Row>
      <Switch>
        { console.log(url) }
        <Route exact path={ url }>
          <Grid.Row centered style={{ height: "calc(90% - 60px)" }}>
            <Grid.Column className={ styles.postsIndexLeftColumn } width={6}>
              {
                newsPostsState.createdNewsPosts.map((newsPost) => {
                  return (
                    <NewsPostCard 
                      key={ newsPost._id } 
                      active={ newsPostsState.newsPostData._id === newsPost._id } 
                      newsPostData={ newsPost } 
                      toggleNewsPost={ handleToggleNewsPost } 
                    />
                  )
                })
              }
            </Grid.Column>
            <Grid.Column width={10} className={ styles.postIndexRightColumn }>{
              localState.newsPostFormOpen ? 
              <PostForm 
                titleText={ localState.editorTitle } 
                editorText={localState.editorText} 
                handleTitleChange={ handleTitleChange } 
                handleUpdateEditor={ handleUpdateEditorChange } 
                newsPostsState={ newsPostsState }
              />
              :
              (
                objectValuesEmpty(newsPostsState.newsPostData)
                ?
                <Segment style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  Open on the side to view your posts
                </Segment>
                :
                <NewsPostPreviewCard 
                  newsPostData={ newsPostsState.newsPostData } 
                  closeCurrentNewsPost={ _handleCloseNewsPost }
                  handleOpenEditCurrentNewsPost={ handleOpenEditNewsPost }
                  triggerDeleteCurrentNewsPost={ triggerDeleteNewsPost }
                  toggleNewsPostLiveStatus={ toggleNewsPostLiveStatus }
                />
              )
            }
            </Grid.Column>
          </Grid.Row>
        </Route>
        <Route path={`${url}/view_all`}>
          <ViewAllPosts 
            newsPosts={ newsPostsState.createdNewsPosts } 
            currentNewsPost={ newsPostsState.newsPostData } 
            handleToggleNewsPost={ handleToggleNewsPost }
            handleOpenEditNewsPost={ handleOpenEditNewsPost }
            triggerDeleteCurrentNewsPost= { triggerDeleteNewsPost }
            toggleNewsPostLiveStatus={ toggleNewsPostLiveStatus }
          />
        </Route>
      </Switch>
    </React.Fragment>
  )
};

const mapStateToProps = (state: RootState) => {
  return {
    newsPostsState: state.newsPostsState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<NewsPostAction>) => {
  return {
    _handleFetchNewsPosts: (options?: any) => handleFetchNewsPosts(dispatch, options),
    _handleCreateNewsPost: (clientNewsPostData: ClientNewsPostFormData) => handleCreateNewsPost(dispatch, clientNewsPostData),
    _handleUpdateNewsPost: (clientNewsPostData: NewsPostData, newsPostsState: NewsPostsState) => handleUpdateNewsPost(dispatch, clientNewsPostData, newsPostsState),
    _handleToggleNewsPostOnlineStatus: (clientNewsPostData: NewsPostData, newsPostsState: NewsPostsState) => handleToggleNewsPostLiveStatus(dispatch, clientNewsPostData, newsPostsState),
    _handleDeleteNewsPost: (newspPostId: string, newsPostsState: NewsPostsState) => handleDeleteNewsPost(dispatch, newspPostId, newsPostsState),
    _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => handleOpenNewsPost(dispatch, newsPostId, newsPostsState),
    _handleCloseNewsPost: () => handleCloseNewsPost(dispatch)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(PostsIndexContainer): React.AbstractComponent<WrapperProps>);