// @flow
import * as React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { PostForm } from "./PostForm";
// additional components //
import { PostsControls } from "./PostsControls";
// redux actions //
import { connect } from "react-redux";
import { handleFetchNewsPosts, handleCreateNewsPost, handleUpdateNewsPost } from "../../../redux/actions/newsPostActions";
// types //
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { NewsPostAction, NewsPostsState, ClientNewsPostFormData, NewsPostUpdateData } from "../../../redux/reducers/news_posts/flowTypes";
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
};

const PostsIndexContainer = ({ _handleFetchNewsPosts, _handleCreateNewsPost, _handleUpdateNewsPost, newsPostsState }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ newPostFormOpen: true, editorTitle: "", editorText: "" });
  
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
  const handleCancelPost = (): Promise<boolean> => {
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
      
      <Grid.Row style={{ height: "10%", border: "5px solid blue" }}>
        <PostsControls 
          formOpen={ localState.newPostFormOpen }
          newPost={ true } 
          handleOpenNewPostForm={ handleOpenNewPostForm } 
          handleSavePost={ handleSavePost }
          handleCancelPost={ handleCancelPost }
          handleDeletePost={ handleDeletePost }
        />
      </Grid.Row>
      <Grid.Row centered style={{ height: "80%", border: "5px solid red"}}>
        <Grid.Column width={6}>
          <Segment style={{height: "100px", width: "300px"}}>1</Segment>
        </Grid.Column>
        <Grid.Column width={10}>{
          localState.newPostFormOpen ? 
          <PostForm titleText={ localState.editorTitle } editorText={localState.editorText} handleTitleChange={ handleTitleChange } handleUpdateEditor={ handleUpdateEditorChange } />
          :
          <Segment>1</Segment>
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
    _handleUpdateNewsPost: (clientNewsPostData: NewsPostUpdateData, newsPostsState: NewsPostsState) => handleUpdateNewsPost(dispatch, clientNewsPostData, newsPostsState)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(PostsIndexContainer): React.AbstractComponent<WrapperProps>);