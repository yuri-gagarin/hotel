// @flow
import * as React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { PostForm } from "./PostForm";
// additional components //
import { PostsControls } from "./PostsControls";
import { NewsPostCard } from "./cards/NewsPostCard";
import { NewsPostPreviewCard } from "./cards/NewsPostPreviewCard";
// redux actions //
import { connect } from "react-redux";
import { handleFetchNewsPosts, handleCreateNewsPost, handleUpdateNewsPost, handleOpenNewsPost, handleCloseNewsPost } from "../../../redux/actions/newsPostActions";
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

type WrapperProps = {

};
type Props = {
  ...WrapperProps;
  newsPostsState: NewsPostsState;
  _handleFetchNewsPosts: (options?: any) => Promise<boolean>;
  _handleCreateNewsPost: (data: ClientNewsPostFormData, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleUpdateNewsPost: (data: NewsPostUpdateData, newsPostsState: NewsPostsState) => Promise<boolean>;
  _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => void;
  _handleCloseNewsPost: () => void;
};

const PostsIndexContainer = ({ _handleFetchNewsPosts, _handleCreateNewsPost, _handleUpdateNewsPost, _handleOpenNewsPost, _handleCloseNewsPost, newsPostsState }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ newPostFormOpen: false, editorTitle: "", editorText: "" });
  
  const handleOpenNewPostForm = (): void => {
    setLocalState({ ...localState, newPostFormOpen: true });
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
     setLocalState({ ...localState, newPostFormOpen: false, editorText: "" });
     return Promise.resolve(true);
  };
  const handleDeletePost = (): Promise<boolean> => {
    setLocalState({ ...localState, newPostFormOpen: false, editorText: "" });
    return Promise.resolve(true);
  };

  React.useEffect(() => {
    _handleFetchNewsPosts();
  }, []);

  return (
    <React.Fragment>
      
      <Grid.Row style={{ height: "10%" }}>
        <PostsControls 
          formOpen={ localState.newPostFormOpen }
          newPost={ true } 
          handleOpenNewPostForm={ handleOpenNewPostForm } 
          handleSavePost={ handleSavePost }
          handleCancelPost={ handleCancelPost }
          handleDeletePost={ handleDeletePost }
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
            <NewsPostPreviewCard newsPostData={ newsPostsState.newsPostData } />
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
    _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => handleOpenNewsPost(dispatch, newsPostId, newsPostsState),
    _handleCloseNewsPost: () => handleCloseNewsPost(dispatch)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(PostsIndexContainer): React.AbstractComponent<WrapperProps>);