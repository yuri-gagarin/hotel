// @flow 
import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, useLocation, withRouter
} from "react-router-dom";
// additional redux imports //
import { connect } from "react-redux";
import { handleSetAdmin } from "./redux/actions/apiActions";
import store from "./redux/store";
// socketio //
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
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
import { ClientNotFoundComponent } from "./components/client_components/shared/ClientNotFoundComponent";
import { ProtectedRoute } from "./components/helpers/protectedRoute";
//

interface SocketIO extends Socket {
  connected?: boolean;
}
export const socket: SocketIO = io("http://localhost:8080");
/*
const AuthorizedRoute = ({ loggedIn, component, path, history }) => {
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
 */

export const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = withRouter(({ history }) => {

  React.useEffect(() => {
    return function () {
      localStorage.removeItem("conversationId");
    }
  }, []);
  
  // admin routes should be protected lated //
  return (
    <React.Fragment>
      <ScrollToTop />
        <Switch>
          <Route path={adminRoutes.ADMIN_LOGIN} component={AdminLoginComponent} />
          <Route path={"/rooms"} exact={true} component={HomeComponent} />
          <Route path={"/dining"} exact={true} component={HomeComponent} />
          <Route path={"/services"} exact={true} component={HomeComponent} />
          <ProtectedRoute clientPath={ "/admin/*" } component={ AdminComponent } history={ history } />
          <Route component={ClientNotFoundComponent} />
        </Switch>
        <Route path={"/"} exact={true} component={HomeComponent} />
    </React.Fragment>
      
  );
});

type WrapperProps = {
  loggedIn: any;
};
type Props = {
  ...WrapperProps;
  adminState: any;
  _setAdmin: (adminData: any) => void;
};

const App = (props) => {
  const { adminState, _setAdmin } = props;
  const { loggedIn } = adminState;
  
  const [socketConnectionInterval, setSocketConnectionInterval] = React.useState(null);

  React.useEffect(() => {
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
    <Router>
      <AppRoutes loggedIn={loggedIn} />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    adminState: state.adminState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _setAdmin: (adminData) => dispatch(handleSetAdmin(adminData))
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(App): React.AbstractComponent<Props>);
