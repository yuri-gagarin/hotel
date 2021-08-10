// @flow
import * as React from "react";
import { Button } from "semantic-ui-react";
// 
import styles from "./css/postsControls.module.css";

type Props = {
  handleOpenNewPostForm: () => void;
  formOpen: boolean;
  newPost: boolean;
  handleSavePost: () => Promise<boolean>;
  handleCancelPost: () => Promise<boolean>;
  handleDeletePost: () => Promise<boolean>;
}
export const PostsControls = ({ formOpen, newPost, handleOpenNewPostForm, handleSavePost, handleCancelPost, handleDeletePost }: Props): React.Node => {

  if (formOpen && newPost) {
    return (
      <div className={ styles.postControlsContainer }>
        <Button color="green" onClick={ handleSavePost }>Save</Button>
        <Button color="orange" onClick={ handleCancelPost }>Cancel</Button>
      </div>
    )
  } else if (formOpen && !newPost) {
    return (
      <div className={ styles.postControlsContainer }>  
        <Button color="green" onClick={ handleSavePost }>Update</Button>
        <Button color="orange" onClick={ handleCancelPost }>Cancel</Button>
        <Button color="red" onClick={ handleDeletePost }>Delete</Button>
      </div>
    );
  } else {
    return (
      <div className={ styles.postControlsContainer }>
        <Button color="green" onClick={ handleOpenNewPostForm }>New Post</Button>
        <Button color="blue">View All</Button>
      </div>
    )
  }
 
}