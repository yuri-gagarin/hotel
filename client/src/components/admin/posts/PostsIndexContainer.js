// @flow
import * as React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { PostForm } from "./PostForm";
// additional components //
import { ConfirmDeleteModal} from "../shared/ConfirmDeleteModal";
import { PostsControls } from "./PostsControls";
import { NewsPostCard } from "./cards/NewsPostCard";
import { NewsPostPreviewCard } from "./cards/NewsPostPreviewCard";
// redux actions //
import { connect } from "react-redux";
import { handleFetchNewsPosts, handleCreateNewsPost, handleUpdateNewsPost, handleDeleteNewsPost, handleOpenNewsPost, handleCloseNewsPost, setNewsPostError } from "../../../redux/actions/newsPostActions";
// types //
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { NewsPostAction, NewsPostsState, ClientNewsPostFormData, NewsPostUpdateData } from "../../../redux/reducers/news_posts/flowTypes";
// styles //
import styles from "./css/postsIndexContainer.module.css";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";

type LocalState = {
  newPostFormOpen: boolean;
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
  _handleUpdateNewsPost: (data: NewsPostUpdateData, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleDeleteNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => void;
  _handleCloseNewsPost: () => void;
};

const PostsIndexContainer = ({ _handleFetchNewsPosts, _handleCreateNewsPost, _handleUpdateNewsPost, _handleDeleteNewsPost, _handleOpenNewsPost, _handleCloseNewsPost, newsPostsState }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ newPostFormOpen: false, editorTitle: "", editorText: "" });
  const [ confirmDeleteModalState, setConfirmDeleteModalState ] = React.useState<ConfirmDeleteModalState>({ modalOpen: false, modelName: "", modelId: "" });

  const handleOpenNewPostForm = (): void => {
    setLocalState({ ...localState, newPostFormOpen: true });
  };
  const handleOpenEditNewsPost = (): void => {
    const { title, content } = newsPostsState.newsPostData;
    setLocalState({ newPostFormOpen: true, editorTitle: title, editorText: content });
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
          if(success) setLocalState({ newPostFormOpen: false, editorTitle: "", editorText: "" });
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    } else {
      const editedPost: NewsPostUpdateData = {
        ...newsPostsState.newsPostData,
        title: localState.editorTitle,
        content: localState.editorText
      };
      return _handleUpdateNewsPost(editedPost, newsPostsState)
        .then((success) => {
          if(success) setLocalState({ newPostFormOpen: false, editorTitle: "", editorText: "" });
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  };
  const handleToggleNewsPost = (newsPostId: string): void => {
    _handleOpenNewsPost(newsPostId, newsPostsState);
  };
  const handleCancelPost = (): Promise<boolean> => {
    _handleCloseNewsPost();
     setLocalState({ ...localState, newPostFormOpen: false, editorTitle: "", editorText: "" });
     return Promise.resolve(true);
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
    if (!objectValuesEmpty(newsPostsState.newsPostData) && localState.newPostFormOpen) {
      setLocalState({ ...localState, newPostFormOpen: false });
    }
  }, [ newsPostsState ]);

  return (
    <React.Fragment>
      <ConfirmDeleteModal open={ confirmDeleteModalState.modalOpen} modelName="news post" confirmAction={ confirmDeleteNewsPost } cancelAction={ cancelDeleteNewsPost }/>
      <Grid.Row style={{ height: "10%" }}>
        <PostsControls 
          formOpen={ localState.newPostFormOpen }
          newPost={ objectValuesEmpty(newsPostsState.newsPostData) } 
          handleOpenNewPostForm={ handleOpenNewPostForm } 
          handleSavePost={ handleSavePost }
          handleCancelPost={ handleCancelPost }
          handleDeletePost={ triggerDeleteNewsPost }
        />
      </Grid.Row>
      <Grid.Row centered style={{ height: "80%" }}>
        <Grid.Column className={ styles.postsCardColumn } width={6}>
          {
            newsPostsState.createdNewsPosts.map((newsPost) => {
              return (
                <NewsPostCard key={ newsPost._id } newsPostData={ newsPost } toggleNewsPost={ handleToggleNewsPost } />
              )
            })
          }
        </Grid.Column>
        <Grid.Column width={10}>{
          localState.newPostFormOpen ? 
          <PostForm titleText={ localState.editorTitle } editorText={localState.editorText} handleTitleChange={ handleTitleChange } handleUpdateEditor={ handleUpdateEditorChange } />
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
            />
          )
        }
        </Grid.Column>
      </Grid.Row>
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
    _handleUpdateNewsPost: (clientNewsPostData: NewsPostUpdateData, newsPostsState: NewsPostsState) => handleUpdateNewsPost(dispatch, clientNewsPostData, newsPostsState),
    _handleDeleteNewsPost: (newspPostId: string, newsPostsState: NewsPostsState) => handleDeleteNewsPost(dispatch, newspPostId, newsPostsState),
    _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => handleOpenNewsPost(dispatch, newsPostId, newsPostsState),
    _handleCloseNewsPost: () => handleCloseNewsPost(dispatch)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(PostsIndexContainer): React.AbstractComponent<WrapperProps>);