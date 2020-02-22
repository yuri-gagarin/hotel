import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
import AdminNavComponent from "./nav/AdminNav";

import { adminRoutes } from "../../routes/appRoutes";
import ConversationIndexContainer from "./conversations/ConversationIndexContainer";
import AdminDashComponent from "./dash/AdminDashComponent";
import PostsIndexContainer from "./posts/PostsIndexContainer";
import ObjectID from "bson-objectid";
import { connect } from "react-redux";
import { setAdmin } from "../../redux/actions/clientActions";

const AdminComponent = (props) => {
  const { history, clientState, setAdmin } = props;
 
  
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
  history: PropTypes.object.isRequired,
  clientState: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    clientState: state.clientState,
    adminState: state.adminState
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (adminData) => dispatch(setAdmin(adminData))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminComponent));