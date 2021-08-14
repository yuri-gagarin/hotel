// @flow
import * as React from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router";
import { Button, Dropdown, Menu } from "semantic-ui-react";
// additional components //
import { PostSortControls } from "./controls/PostSortControls";
// 
import styles from "./css/postsControls.module.css";

type Props = {
  handleOpenNewPostForm: () => void;
  formOpen: boolean;
  newPost: boolean;
  handleSavePost: () => Promise<boolean>;
  handleCancelPost: () => void;
  handleDeletePost: () => void;
};


export const PostsControls = ({ formOpen, newPost, handleOpenNewPostForm, handleSavePost, handleCancelPost, handleDeletePost }: Props): React.Node => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const [ currentUrl, setCurrentURL ] = React.useState<string>(url);

  const toggleViewAllPosts = (url): void => {
    let route: string;
    if (currentUrl === "/admin/posts") {
      route = url + "/view_all";
      history.push(route);
      setCurrentURL(route);

    } else if (currentUrl === "/admin/posts/view_all") {
      route = "/admin/posts";
      history.push("/admin/posts");
      setCurrentURL(route);
    } else {
      return;
    }
  };


  if (formOpen && newPost) {
    return (
      <div className={ styles.postControlsContainer }>
        <div>
          <Button color="green" onClick={ handleSavePost }>Save</Button>
          <Button color="orange" onClick={ handleCancelPost }>Cancel</Button>
        </div>
      </div>
    );
  } else if (formOpen && !newPost) {
    return (
    <div className={ styles.postControlsContainer }>
       <div> 
        <Button color="green" onClick={ handleSavePost }>Update</Button>
        <Button color="orange" onClick={ handleCancelPost }>Cancel</Button>
        <Button color="red" onClick={ handleDeletePost }>Delete</Button>
      </div>
    </div>
     
    );
  } else {
    return (
      <div className={ styles.postControlsContainer }>
        <div>
          <Button color="green" onClick={ handleOpenNewPostForm }>New Post</Button>
          <Button color="blue" onClick={ () => toggleViewAllPosts(url) }>{currentUrl === "/admin/posts" ? "View All" : "View Editor"}</Button>
        </div>
        {
        pathname === "/admin/posts/view_all" || pathname === "/admin/posts"
        ?
        <div>
          <PostSortControls />
        </div>
        : null
        }
        { console.log(pathname) }
      </div>
    );
  }
};