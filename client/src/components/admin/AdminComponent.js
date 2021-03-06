import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
// additional components //
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
// socket io client //
import { socket } from "./../../App";
// helper functions //
import checkLogin from "./../helpers/checkLogin";


const AdminComponent = (props) => {
  // redux state objects //
  const { 
    history, adminState, adminConvState,
    roomState, appGeneralState,
    contactPostState, serviceState
  } = props;
  // redux action functions //
  const {
    _clearAppError, _clearSuccessState, _logoutUser, _setAdmin
  } = props; 
  // error and success states //
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(null);

  const saveAdminState = () => {
    const { loggedIn } = adminState;
    if (loggedIn) {
      const adminStateString = JSON.stringify(adminState);
      localStorage.setItem("hotelAdminState", adminStateString);
    } else {
      return;
    }
  };
  // set the localStoreage state  so the app can reload //
  useEffect(() => {
    const { loggedIn } = adminState;
    if (!loggedIn) {
      checkLogin().then((success) => {
        if (success) {
          // get saved admin state information //
          const adminState = JSON.parse(localStorage.getItem("hotelAdminState"));
          if (adminState) {
            _setAdmin(adminState);
          }
        } else {
          history.push("/login/admin");
        }
      });
    }
    // event listener for closed window //
    window.addEventListener("beforeunload", saveAdminState);
    return function () {
      window.removeEventListener("beforeunload", saveAdminState);
    }
  }, []);
  // save admin state to localStorage //
  useEffect(() => {
    const { loggedIn, firstName, lastName } = adminState;
    if (!localStorage.getItem("hotelAdminState")) {
      if (loggedIn && firstName && lastName) {
        const adminStateString = JSON.stringify(adminState);
        localStorage.setItem("hotelAdminState", adminStateString);
      }
    }
    if (loggedIn) {
       socket.emit("adminConnected", adminState);
    }
  }, [adminState]);
  // timeouts for the error and success components //
  useEffect(() => {
    const { error, successComponentOpen } = appGeneralState;
    if (error) {
      setErrorTimeout(setTimeout(() => {
        _clearAppError();
      }, 5000));
    }
    if (!error && errorTimeout) {
      _clearTimeout(errorTimeout);
      setErrorTimeout(null);
    }
    if (successComponentOpen) {
      setSuccessTimeout(setTimeout(() =>{
        _clearSuccessState();
      }, 5000))
    }
    if (!successComponentOpen && successTimeout) {
      _clearTimeout(successTimeout);
      setSuccessTimeout(null);
    }
  }, [appGeneralState]);
  // logout user functionality //
  const logoutUser = (e) => {
    _logoutUser(history);
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
    _setAdmin: (adminData) => dispatch(setAdmin(adminData)),
    _logoutUser: (history) => logOutUser(dispatch, history),
    _clearAppError: () => dispatch(clearAppError()),
    _clearSuccessState: () => dispatch(clearSuccessState())
  };
};
// export default component with dependencies //
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminComponent));