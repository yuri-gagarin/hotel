// @flow
import * as React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { PostForm } from "./PostForm";
// additional components //
import { PostsControls } from "./PostsControls";

type LocalState = {
  newPostFormOpen: boolean;
  editorText: string;
}
const PostsIndexContainer = (): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ newPostFormOpen: true, editorText: "" });

  const handleOpenNewPostForm = (): void => {
    setLocalState({ ...localState, newPostFormOpen: true });
  };

  const handleUpdateEditorChange = (editor: any) => {
    setLocalState({ ...localState, editorText: editor.getData() });
  };

  const handleSavePost = (): Promise<boolean> => {
    console.log(localState.editorText);
    return Promise.resolve(true);
  };
  const handleCancelPost = (): Promise<boolean> => {
     setLocalState({ ...localState, newPostFormOpen: false, editorText: "" });
     return Promise.resolve(true);
  };
  const handleDeletePost = (): Promise<boolean> => {
    setLocalState({ ...localState, newPostFormOpen: false, editorText: "" });
    return Promise.resolve(true);
  }

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
          <PostForm editorText={localState.editorText} handleUpdateEditor={ handleUpdateEditorChange } />
          :
          <Segment>1</Segment>
        }
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )
};

export default PostsIndexContainer;