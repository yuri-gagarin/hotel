// @flow
import * as React from "react";
import { Grid } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom"; 
// additional components //
import AdminNavComponent from "./nav/AdminNav";
import ConversationIndexContainer from "./conversations/ConversationIndexContainer";
import ContactPostContainer from "./contact/ContactPostIndexContainer";
import AdminDashComponent from "./dash/AdminDashComponent";
import PostsIndexContainer from "./posts/PostsIndexContainer";
import RoomsIndexContainer from "./rooms/RoomsIndexContainer";
import DiningEntertainmentIndexContainer from "./dining_entertainment/DiningEntertainmentIndexContainer";
import SuccessComponent from "./../display_components/SuccessComponent";
import ErrorComponent from "./../display_components/ErrorComponent";
import ServicesIndexContainer from "./services/ServicesIndexContainer";
// redux imports //
import { connect } from "react-redux";
import { handleLogOutUser, handleSetAdmin } from "../../redux/actions/apiActions";
//import { clearAppError, clearSuccessState } from "../../redux/actions/appGeneralActions";
// socket io client //
import { socket } from "./../../App";
// types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch, AppAction } from "../../redux/reducers/_helpers/createReducer";
import type { AdminConversationState } from "../../redux/reducers/admin_conversations/flowTypes";
import type { ContactPostState } from "../../redux/reducers/contact_posts/flowTypes";
import type { DiningEntertainmentState } from "../../redux/reducers/dining_entertainment/flowTypes";
import type { RoomState } from "../../redux/reducers/rooms/flowTypes";
import type { ServiceState } from "../../redux/reducers/service/flowTypes";

// helper functions //
import checkLogin from "./../helpers/checkLogin";

type OwnProps = {
};
type RouterProps = {
  ...OwnProps;
  history: RouterHistory;
};
type Props = {
  ...RouterProps;
  adminState: any;
  adminConversationState: AdminConversationState;
  contactPostState: ContactPostState;
  diningEntertainmentState: DiningEntertainmentState;
  roomState: RoomState;
  serviceState: ServiceState;
  _handleLogoutUser: (history: RouterHistory) => void;
  _handleSetAdmin: (adminState: any) => void;
};
const AdminComponent = ({ 
  history, adminState, adminConversationState, contactPostState, diningEntertainmentState, roomState, serviceState,
  _handleLogoutUser, _handleSetAdmin
}: Props): React.Node => {
  // redux action functions //
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
  React.useEffect(() => {
    const { loggedIn } = adminState;
    if (!loggedIn) {
      checkLogin().then((success) => {
        if (success) {
          // get saved admin state information //
          const adminState = JSON.parse(window.localStorage.getItem("hotelAdminState"));
          if (adminState) {
            _handleSetAdmin(adminState);
          }
        } else {
          history.push("/login/admin");
        }
      });
    }
    // event listener for closed window //
    window.addEventListener("beforeunload", saveAdminState);
    history.push("/admin/messages");
    return function () {
      window.removeEventListener("beforeunload", saveAdminState);
    }
  }, []);
  /* for development remove later */
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      _handleSetAdmin({
        loggedIn: true,
        loading: false,
        admin: "admin",
        _id: "arandomid",
        email: "email@admin.com",
        firstName: "first",
        lastName: "last",
        phoneNumber: "111-222-3333",
        error: null
      })
    } 
  }, [ process.env.NODE_ENV ])
  // save admin state to localStorage //
  React.useEffect(() => {
    const { loggedIn, firstName, lastName, _id } = adminState;
    if (!localStorage.getItem("hotelAdminState")) {
      if (loggedIn && firstName && lastName) {
        const adminStateString = JSON.stringify(adminState);
        localStorage.setItem("hotelAdminState", adminStateString);
      }
    }
    if (loggedIn && firstName && lastName && _id) {
       socket.emit("adminConnected", adminState);
    }
  }, [adminState]);
  // timeouts for the error and success components //    
  // logout user functionality //
  const logoutUser = (e) => {
    _handleLogoutUser(history);
  };

  return (
    <Grid stackable style={{ height: "100vh" }}>
      <Grid.Row style={{ display: "flex", flex: "1" }}>
        <AdminNavComponent logoutUser={logoutUser} />
      </Grid.Row>
      <Route path="/admin/services">
        <ServicesIndexContainer serviceState={serviceState} />
      </Route>
      <Route path="/admin/dashboard">
        <AdminDashComponent 
          history={ history }
          adminState={ adminState }
          adminConvState={ adminConversationState }
          roomState={ roomState }
          contactPostState={ contactPostState }
          serviceState={ serviceState }
        />
      </Route>
      <Route path="/admin/messages">
        <ConversationIndexContainer history={ history } />
      </Route>
      <Route path="/admin/rooms">
        <RoomsIndexContainer history={ history } roomState={ roomState } />
      </Route>
      <Route path="/admin/dining_entertainment">
        <DiningEntertainmentIndexContainer adminState={adminState} diningEntertainmentState={  diningEntertainmentState } />
      </Route>
      <Route path="/admin/posts">
        <PostsIndexContainer />
      </Route>
      <Route path="/admin/contact_requests">
        <ContactPostContainer contactPostState={contactPostState} />
      </Route>
     
    </Grid>
  )
};
// redux mapping functions //
const mapStateToProps = (state: RootState) => {
  return {
    adminState: state.adminState,
    adminConversationState: state.adminConversationState,
    contactPostState: state.contactPostState,
    diningEntertainmentState: state.diningEntertainmentState,
    roomState: state.roomState,
    serviceState: state.serviceState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    _handleSetAdmin: (adminData: any) => handleSetAdmin(dispatch, adminData),
    _handleLogoutUser: (history: RouterHistory) => handleLogOutUser(dispatch, history),
  };
};
// export default component with dependencies //
export default (withRouter((connect(mapStateToProps, mapDispatchToProps)(AdminComponent): React.AbstractComponent<RouterProps>)): React.AbstractComponent<OwnProps>);
