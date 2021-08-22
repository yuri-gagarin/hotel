// @flow
import * as React from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router";
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";
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
          <Button color="green" onClick={ handleSavePost }>
            Save
            <Icon className={ styles.formBtnIcon } name="save" />
          </Button>
          <Button color="orange" onClick={ handleCloseNewPostForm }>
            Cancel
            <Icon className={ styles.formBtnIcon } name="cancel" />
          </Button>
        </div>
      </div>
    );
  } else {
    return (
    <div className={ styles.postControlsContainer }>
       <div> 
        <Button color="green" onClick={ handleSavePost }>
          Update
          <Icon className={ styles.formBtnIcon } name="save" />
        </Button>
        <Button color="orange" onClick={ handleCloseNewPostForm }>
          Cancel
          <Icon className={ styles.formBtnIcon } name="cancel" />
        </Button>
      </div>
      <div>
        <Button color="red" onClick={ handleDeletePost }>
          Delete
          <Icon className={ styles.formBtnIcon } name="trash alternate outline" />
        </Button>
      </div>
    </div>
     
    );
  } 
};