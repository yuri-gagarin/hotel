import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
import AdminNavComponent from "./nav/AdminNav";

import ConversationIndexContainer from "./conversations/ConversationIndexContainer";
import AdminDashComponent from "./dash/AdminDashComponent";
import PostsIndexContainer from "./posts/PostsIndexContainer";
import RoomsIndexContainer from "./rooms/RoomsIndexContainer";
// redux imports //
import { connect } from "react-redux";
import { logOutUser, setAdmin } from "../../redux/actions/apiActions";



const setUserCredentials = (userData) => {
  const adminState = JSON.stringify(userData);
  localStorage.setItem("hotelAdminState", adminState);
};
const cleanUserState = () => {

};

const AdminComponent = (props) => {
  const { 
    history, 
    adminState,
    adminRoomState, 
    setAdmin,
    handleLogout } = props;
 
  useEffect(() => {
    // set the localStoreage state  so the app can reload //
    if (!localStorage.getItem("hotelAdminState")) {
      setUserCredentials(adminState);
    } else {
      const savedState = JSON.parse(localStorage.getItem("hotelAdminState"));
      // set admin state on refresh //
      setAdmin(savedState);
    }
  }, []); 

  const logoutUser = (e) => {
    handleLogout(history);
  };

  return (
    <Grid stackable padded divided style={{paddingLeft: "1em", paddingRight: "1em"}}>
      <Grid.Row>
        <Grid.Column width={16}>
          <AdminNavComponent logoutUser={logoutUser} />
        </Grid.Column>
      </Grid.Row>
      <Route path="/admin/dashboard">
        <AdminDashComponent adminState={adminState}/>
      </Route>
      <Route path="/admin/messages">
        <ConversationIndexContainer />
      </Route>
      <Route path="/admin/rooms">
        <RoomsIndexContainer adminState={adminState} adminRoomState={adminRoomState} />
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
  adminState: PropTypes.object.isRequired,
  adminRoomState: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    clientState: state.clientState,
    adminState: state.adminState,
    adminRoomState: state.adminRoomState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (adminData) => dispatch(setAdmin(adminData)),
    handleLogout: (history) => logOutUser(dispatch, history)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminComponent));