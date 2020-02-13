import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
import AdminNavComponent from "./nav/AdminNav";

import { adminRoutes } from "../../routes/appRoutes";
import ConversationIndexContainer from "./conversations/ConversationIndexContainer";
import AdminDashComponent from "./dash/AdminDashComponent";
import PostsIndexContainer from "./posts/PostsIndexContainer";

/*
const DashRendering = ({ history }) => {
  const location = history.location.pathname;
  console.log(location);
  switch (location) {
    case adminRoutes.ADMIN_DASH: {
      return (
        <AdminDashComponent />
      );
    };
    case adminRoutes.ADMIN_MESSAGES: {
      return (
        <ConversationIndexContainer />
      );
    };
    case adminRoutes.ADMIN_POSTS: {
      return (
        <PostsIndexContainer />
      );
    };
    case adminRoutes.ADMIN_REGULATE_USERS: {
      return (
        <UsersIndexContainer />
      );
    };
    default: {
      return (
        <AdminDashComponent />
      )
    }
  };
};
*/

const AdminComponent = (props) => {
  const { history } = props;
  return (
    <Grid stackable padded divided style={{paddingLeft: "1em", paddingRight: "1em"}}>
      <Grid.Row>
        <Grid.Column width={16}>
          <AdminNavComponent />
        </Grid.Column>
      </Grid.Row>
      <Route path="/admin/dashboard">
        <AdminDashComponent />
      </Route>
      <Route path="/admin/messages">
        <ConversationIndexContainer />
      </Route>
      <Route path="/admin/posts">
        <PostsIndexContainer />
      </Route>
    </Grid>
  )
};
// proptypes checking //
AdminComponent.propTypes = {

};

export default withRouter(AdminComponent);