/* global jQuery, define */
import React, { useEffect, useState }from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// additional redux imports //
import { connect } from "react-redux";
import { setAdmin } from "./redux/actions/apiActions";
import store from "./redux/store";
// socketio //
import io from "socket.io-client";
// axios //
import axios from "axios";
import "./assets/theme/vendor/jquery/jquery";
import "./assets/theme/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/theme/vendor/fontawesome-free/css/all.css";
import "./assets/css/convoSplashScreen.css";
import "./assets/css/successComponent.css";
import "./assets/css/componentFadeIns.css";
import "./assets/theme/agency.css";
import "./assets/theme/booking_style.css";
import './App.css';
// client route constants //
import { adminRoutes, appRoutes } from "./routes/appRoutes";
// additional components //
import HomeComponent from "./components/client_components/HomeComponent";
import AdminComponent from './components/admin/AdminComponent';
import AdminLoginComponent from "./components/admin/auth/AdminLoginComponent";
import RoomsIndexContainer from './components/client_components/rooms/RoomsIndexContainer';
export const socket = io.connect("http://localhost:8080");


const AuthorizedRoute = ({ loggedIn, component, path }) => {
  if (loggedIn) {
    return (
      <Route 
        path={path}
        component={component}
      />
    );
  } else {
    return (
      <Route
        path={"/login/admin"}
        exact={true}
        component={AdminLoginComponent}
      />
    );
  }
 };

const AppRoutes = (props) => {
  const cleanUpState = () => {
    // some cleanup here //
    localStorage.removeItem("conversationId");
  }
  useEffect(() => {
    return cleanUpState();
  }, []);
  

  return (
    <Router>
      <Switch>
        <AuthorizedRoute path={"/admin/*"} loggedIn={true} component={AdminComponent} />
        <Route path={adminRoutes.ADMIN_LOGIN} exact={true} component={AdminLoginComponent} />
        <Route path={"/rooms"} exact={true} component={RoomsIndexContainer} />
        <Route path={appRoutes.HOME_ROUTE} exact={true} component={HomeComponent} />
       </Switch>
    </Router>
  );
}

class App extends React.Component {
  constructor (props) {
    super(props);
  }
  checkLogin = () => {
    // checks for user login //
    const requestParams = {
      method: "get",
      url: "/api/logged_in"
    }
    return axios(requestParams)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          // user is logged in still //
          const savedState = JSON.parse(localStorage.getItem("hotelAdminState"));
          this.props.setAdmin({ ...savedState, loggedIn: true })
        } else {
          // not a status code 200 //
          this.props.setAdmin({ ...savedState, loggedIn: false })
        }
      })
      .catch((error) => {
        const savedState = JSON.parse(localStorage.getItem("hotelAdminState"));
        this.props.setAdmin({ ...savedState, loggedIn: false })
      });
  }
  componentDidMount() {
    this.checkLogin()
  }
  render() {
    const { loggedIn } = store.getState().adminState;
    return (
      <AppRoutes loggedIn={loggedIn} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    adminState: state.adminState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (adminData) => dispatch(setAdmin(adminData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
