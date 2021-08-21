// @flow
import * as React from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router";
import { Button, Dropdown, Menu } from "semantic-ui-react";
// additional components //
// 
import styles from "./css/newsPostFormControls.module.css";

type Props = {
  newPost: boolean;
  handleCloseNewPostForm: () => void;
  handleSavePost: () => Promise<boolean>;
  handleDeletePost: () => void;
};


export const NewsPostFormControls = ({ newPost, handleCloseNewPostForm, handleSavePost, handleDeletePost }: Props): React.Node => {

  if (newPost) {
    return (
      <div className={ styles.postControlsContainer }>
        <div>
          <Button color="green" onClick={ handleSavePost }>Save</Button>
        </div>
        <div>
          <i className={ `far fa-times-circle ${styles.closeBtn}`} onClick={ handleCloseNewPostForm }></i>
        </div>
      </div>
    );
  } else {
    return (
    <div className={ styles.postControlsContainer }>
       <div> 
        <Button color="green" onClick={ handleSavePost }>Update</Button>
        <Button color="red" onClick={ handleDeletePost }>Delete</Button>
      </div>
      <div>
        <i className={ `far fa-times-circle ${styles.closeBtn}`} onClick={ handleCloseNewPostForm }></i>
      </div>
    </div>
     
    );
  } 
};