// @flow
import * as React from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router";
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";
// additional components //
import { PostSortControls } from "./controls/PostSortControls";
// 
import styles from "./css/postsControls.module.css";

type Props = {
  handleOpenNewPostForm: () => void;
};


export const PostsControls = ({ handleOpenNewPostForm }: Props): React.Node => {
  const history = useHistory();
  const { pathname } = useLocation();


  const toggleViewAllPosts = (url): void => {
    let route: string;
    if (pathname === "/admin/posts") {
      route = url + "/view_all";
      history.push(route);

    } else if (pathname.includes("/admin/posts/view_all")) {
      route = "/admin/posts";
      history.push("/admin/posts");
    } else {
      return;
    }
  };

  return (
    <div className={ styles.postControlsContainer }>
      <div>
        <Button color="green" onClick={ handleOpenNewPostForm }>
          New Post
          <Icon className={ styles.controlsIcon } name="file" />
        </Button>
        <Button color="blue" onClick={ () => toggleViewAllPosts(pathname) }>
          {pathname === "/admin/posts" ? "View All" : "View Editor"}
          {pathname === "/admin/posts" ? <Icon className={ styles.controlsIcon } name="archive" /> : <Icon className={ styles.controlsIcon } name="edit" />}
        </Button>
      </div>
      {
      pathname === "/admin/posts/view_all" || pathname === "/admin/posts"
      ?
      <div>
        <PostSortControls />
      </div>
      : null
      }
    </div>
  );
};