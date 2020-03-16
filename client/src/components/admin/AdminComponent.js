import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
// sockek io //
import io from "socket.io-client";
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
import ContactPostContainer from "./contact/ContactPostContainer";
import ServicesIndexContainer from "./services/ServicesIndexContainer";
// 

const setUserCredentials = (userData) => {
  const adminState = JSON.stringify(userData);
  localStorage.setItem("hotelAdminState", adminState);
};

const AdminComponent = (props) => {
  // redux state objects //
  const { 
    history, adminState, adminConvState,
    roomState, appGeneralState,
    contactPostState, serviceState
  } = props;
  // redux action functions //
  const {
    clearAppError, clearSuccessState, handleLogout, setAdmin
  } = props; 
  // error and success states //
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(null);
  // set the localStoreage state  so the app can reload //
  useEffect(() => {
    if (!localStorage.getItem("hotelAdminState")) {
      setUserCredentials(adminState);
    } else {
      const savedState = JSON.parse(localStorage.getItem("hotelAdminState"));
      // set admin state on refresh //
      setAdmin(savedState);
    }
  }, []); 
  // timeouts for the error and success components //
  useEffect(() => {
    const { error, successComponentOpen } = appGeneralState;
    if (error) {
      setErrorTimeout(setTimeout(() => {
        clearAppError();
      }, 5000));
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
      setErrorTimeout(null);
    }
    if (successComponentOpen) {
      setSuccessTimeout(setTimeout(() =>{
        clearSuccessState();
      }, 5000))
    }
    if (!successComponentOpen && successTimeout) {
      clearTimeout(successTimeout);
      setSuccessTimeout(null);
    }
  }, [appGeneralState]);
  // logout user functionality //
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
        <AdminDashComponent 
          history={history}
          adminState={adminState}
          adminConvState={adminConvState}
          roomState={roomState}
          appGeneralState={appGeneralState}
          contactPostState={contactPostState}
          serviceState={serviceState}
        />
      </Route>
      <Route path="/admin/messages">
        <ConversationIndexContainer />
      </Route>
      <Route path="/admin/rooms">
        <RoomsIndexContainer adminState={adminState} roomState={roomState} />
      </Route>
      <Route path="/admin/posts">
        <PostsIndexContainer />
      </Route>
      <Route path="/admin/contactPosts">
        <ContactPostContainer contactPostState={contactPostState} />
      </Route>
      <Route path="/admin/services">
        <ServicesIndexContainer serviceState={serviceState} />
      </Route>
    </Grid>
  )
};
// proptypes checking //
AdminComponent.propTypes = {
  history: PropTypes.object.isRequired,
  adminConvState: PropTypes.object.isRequired,
  adminState: PropTypes.object.isRequired,
  roomState: PropTypes.object.isRequired,
  appGeneralState: PropTypes.object.isRequired,
  contactPostState: PropTypes.object.isRequired,
  serviceState: PropTypes.object.isRequired
};
// redux mapping functions //
const mapStateToProps = (state) => {
  return {
    adminConvState: state.adminConvState,
    roomState: state.roomState,
    adminState: state.adminState,
    appGeneralState: state.appGeneralState,
    contactPostState: state.contactPostState,
    serviceState: state.serviceState
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
// export default component with dependencies //
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminComponent));