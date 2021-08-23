// @flow
import * as React from "react";
import { Grid, Icon, Modal, Segment } from "semantic-ui-react";
// router //
import { useRouteMatch, useHistory, Route, Switch } from "react-router-dom";
// redux actions //
import { connect } from "react-redux";
import {
   handleFetchNewsPosts, handleCreateNewsPost, handleUpdateNewsPost, handleToggleNewsPostLiveStatus, handleDeleteNewsPost, handleOpenNewsPost, handleCloseNewsPost, setNewsPostError,
   handleUploadNewsPostImage, handleDeleteNewsPostImage, handleDeleteAllNewsPostImages
} from "../../../redux/actions/newsPostActions";
// additional components //
import { ConfirmDeleteModal} from "../shared/ConfirmDeleteModal";
import { PostsControls } from "./PostsControls";
import { PostForm } from "./PostForm";
import { NewsPostCard } from "./cards/NewsPostCard";
import { NewsPostFormControls } from "./controls/NewsPostFormControls";
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
  modelName: "newsPost" | "image" | "";
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
  // images //
  _handleUploadNewsPostImage: <NewsPostsState>(file: FormData, currentNewsPostsState: NewsPostsState) => Promise<boolean>,
  _handleDeleteNewsPostImage: (imageIdToDelete: string, currentNewsPostsState: NewsPostsState) => Promise<boolean>,
  _handleDeleteAllNewsPostImages: (currentNewsPostsState: NewsPostsState) => Promise<boolean>
};

const PostsIndexContainer = ({ _handleFetchNewsPosts, _handleCreateNewsPost, _handleUpdateNewsPost, _handleToggleNewsPostOnlineStatus, _handleDeleteNewsPost, _handleOpenNewsPost, _handleCloseNewsPost, 
  newsPostsState, _handleUploadNewsPostImage, _handleDeleteNewsPostImage, _handleDeleteAllNewsPostImages }: Props): React.Node => {

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
      if (newsPostsState.newsPostImages && newsPostsState.newsPostImages.length > 0) {
        // get rid of uploaded images //
        _handleDeleteAllNewsPostImages(newsPostsState)
          .then((success) => {
            setLocalState({ ...localState, newsPostFormOpen: false, editorTitle: "", editorText: "" });
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        setLocalState({ ...localState, newsPostFormOpen: false, editorTitle: "", editorText: "" });
      }
    } else {
      //_handleCloseNewsPost();
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
    setConfirmDeleteModalState({ modalOpen: true, modelName: "newsPost", modelId: _id });
  };
  const cancelDeleteNewsPost = (): void => {
    setConfirmDeleteModalState({ modalOpen: false, modelName: "", modelId: "" });
  };

  const confirmDeleteModel = (): Promise<boolean> => {
    const { modelName, modelId } = confirmDeleteModalState;
    if (modelName === "newsPost" && modelId) {
      return _handleDeleteNewsPost(modelId, newsPostsState)
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
        });
    } else if (modelName === "image" && modelId) {
      return _handleDeleteNewsPostImage(modelId, newsPostsState)
        .then((success) => {
          if (success) {
            setConfirmDeleteModalState({ modalOpen: false, modelId: "", modelName: "" });
            return true;
          }
          return false;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    } else {
      return Promise.resolve(false);
    }
  };

  // image delete functionality //
  const triggerDeleteNewsPostImage = (imageId: string): void => {
    setConfirmDeleteModalState({ modalOpen: true, modelName: "image", modelId: imageId });
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
      <ConfirmDeleteModal open={ confirmDeleteModalState.modalOpen} modelName="newsPost" confirmAction={ confirmDeleteModel } cancelAction={ cancelDeleteNewsPost }/>
      <Grid.Row style={{ height: "60px", display: "flex", alignItems: "center", padding: 0 }}>
        <PostsControls 
          handleOpenNewPostForm={ handleOpenNewsPostForm } 
        />
      </Grid.Row>
      <Switch>
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
              <Modal open={ localState.newsPostFormOpen } size="fullscreen" className={ styles.formModal }>
                <NewsPostFormControls 
                  newPost={ objectValuesEmpty(newsPostsState.newsPostData) }
                  handleSavePost={ handleSavePost }
                  handleDeletePost={ triggerDeleteNewsPost }
                  handleCloseNewPostForm={ handleCancelPost }
                />
                <PostForm 
                titleText={ localState.editorTitle } 
                editorText={localState.editorText} 
                handleTitleChange={ handleTitleChange } 
                handleUpdateEditor={ handleUpdateEditorChange } 
                newsPostsState={ newsPostsState }
                triggerImgModelDelete={ triggerDeleteNewsPostImage }
                _handleUploadNewsPostImage={ _handleUploadNewsPostImage }
              />
              </Modal>
             
              :
              (
                objectValuesEmpty(newsPostsState.newsPostData)
                ?
                <div className={ styles.indexEditorClosedPage }>
                  <div>News Post Editor</div>
                  <div><Icon name="file word outline" /></div>
                  <div>Open on the side to view your posts or click new to create a new one</div>
                </div>
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
    _handleCreateNewsPost: (clientNewsPostData: ClientNewsPostFormData, newsPostsState: NewsPostsState) => handleCreateNewsPost(dispatch, clientNewsPostData, newsPostsState),
    _handleUpdateNewsPost: (clientNewsPostData: NewsPostData, newsPostsState: NewsPostsState) => handleUpdateNewsPost(dispatch, clientNewsPostData, newsPostsState),
    _handleToggleNewsPostOnlineStatus: (clientNewsPostData: NewsPostData, newsPostsState: NewsPostsState) => handleToggleNewsPostLiveStatus(dispatch, clientNewsPostData, newsPostsState),
    _handleDeleteNewsPost: (newspPostId: string, newsPostsState: NewsPostsState) => handleDeleteNewsPost(dispatch, newspPostId, newsPostsState),
    _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => handleOpenNewsPost(dispatch, newsPostId, newsPostsState),
    _handleCloseNewsPost: () => handleCloseNewsPost(dispatch),
    // image handling //
    _handleUploadNewsPostImage: (file: FormData, currentNewsPostsState: NewsPostsState) => handleUploadNewsPostImage(dispatch, file, currentNewsPostsState),
    _handleDeleteNewsPostImage: (imgIdToDelete: string, currentNewsPostsState: NewsPostsState) => handleDeleteNewsPostImage(dispatch, imgIdToDelete, currentNewsPostsState),
    _handleDeleteAllNewsPostImages: (currentNewsPostsState: NewsPostsState) => handleDeleteAllNewsPostImages(dispatch, currentNewsPostsState)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(PostsIndexContainer): React.AbstractComponent<WrapperProps>);