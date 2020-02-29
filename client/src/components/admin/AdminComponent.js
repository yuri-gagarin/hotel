import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
import AdminNavComponent from "./nav/AdminNav";

import ConversationIndexContainer from "./conversations/ConversationIndexContainer";
import AdminDashComponent from "./dash/AdminDashComponent";
import PostsIndexContainer from "./posts/PostsIndexContainer";
import RoomsIndexContainer from "./rooms/RoomsIndexContainer";
import SuccessComponent from "./../display_components/SuccessComponent";
import ErrorComponent from "./../display_components/ErrorComponent";
// redux imports //
import { connect } from "react-redux";
import { logOutUser, setAdmin } from "../../redux/actions/apiActions";
import { clearAppError, clearSuccessState } from "../../redux/actions/appGeneralActions";



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
    handleLogout,
    appGeneralState,
    clearAppError,
    clearSuccessState
  } = props;
 
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
    <Grid stackable padded divided centered style={{paddingLeft: "1em", paddingRight: "1em"}}>
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={clearSuccessState} />
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={clearAppError} />
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
    adminRoomState: state.adminRoomState,
    appGeneralState: state.appGeneralState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (adminData) => dispatch(setAdmin(adminData)),
    handleLogout: (history) => logOutUser(dispatch, history),
    clearAppError: () => dispatch(clearAppError()),
    clearSuccessState: () => dispatch(clearSuccessState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminComponent));