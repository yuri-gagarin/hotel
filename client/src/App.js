/* global jQuery, define */
import React, { useEffect, useState }from 'react';
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch, Route, useLocation
} from "react-router-dom";
// additional redux imports //
import { connect } from "react-redux";
import { setAdmin } from "./redux/actions/apiActions";
import store from "./redux/store";
// socketio //
import io from "socket.io-client";
// axios //
import "./assets/theme/vendor/jquery/jquery";
import "./assets/theme/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/theme/vendor/fontawesome-free/css/all.css";
import "./assets/css/convoSplashScreen.css";
import "./assets/css/successComponent.css";
import "./assets/css/componentFadeIns.css";
import "./assets/css/clientMessageForm.css";
import "./assets/css/adminMessagesView.css";
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
import ServicesIndexComponent from "./components/client_components/services/ServicesIndexComponent";
import DiningIndexComponent from './components/client_components/dining/DiningIndex';
//
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

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = (props) => {

  useEffect(() => {
    return function () {
      localStorage.removeItem("conversationId");
    }
  }, []);
  

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path={"/admin/*"} loggedIn={true} component={AdminComponent} />
        <Route path={adminRoutes.ADMIN_LOGIN} exact={true} component={AdminLoginComponent} />
        <Route path={"/rooms"} exact={true} component={RoomsIndexContainer} />
        <Route path={"/services"} exact={true} component={ServicesIndexComponent} />
        <Route path={'/dining'} exact={true} component={ DiningIndexComponent } />
        <Route path={appRoutes.HOME_ROUTE} exact={true} component={HomeComponent} />
       </Switch>
    </Router>
  );
}

const App = (props) => {
  const { adminState, _setAdmin } = props;
  const { loggedIn } = adminState;
  
  const [socketConnectionInterval, setSocketConnectionInterval] = useState(null);

  useEffect(() => {
    // keep client connected to the same socket if idle //
    socket.on("clientCredentialsReceived", () => {
      // set an interval to keep connection alive while idle //
      setSocketConnectionInterval(
        setInterval(() => {
          socket.emit("keepConnectionAlive");
        }, 5000)
      );
    });
    // keep admin connected if admin is logged in on their sice //
    socket.on("adminCredentialsReceived", () => {
      setSocketConnectionInterval(
        setInterval(() => {
          socket.emit("keepConnectionAlive");
        }, 5000)
      );
    });
    return () => {
      clearInterval(socketConnectionInterval);
    }
  }, []);

  return (
    <AppRoutes loggedIn={loggedIn} />
  );
};
// PropTypes validation //
App.propTypes = {
  adminState: PropTypes.object.isRequired,
  _setAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    adminState: state.adminState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _setAdmin: (adminData) => dispatch(setAdmin(adminData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
