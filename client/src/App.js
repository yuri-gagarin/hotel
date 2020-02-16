/* global jQuery, define */
import React, { useEffect, useState }from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/theme/vendor/jquery/jquery";
import "./assets/theme/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/theme/vendor/fontawesome-free/css/all.css";
import "./assets/theme/agency.css";
import "./assets/theme/booking_style.css";
import './App.css';
// client route constants //
import { adminRoutes, appRoutes } from "./routes/appRoutes";
import HomeComponent from "./components/HomeComponent";
import AdminComponent from './components/admin/AdminComponent';
import AdminLoginComponent from "./components/admin/auth/AdminLoginComponent";
// additional redux imports //
import store from "./redux/store";
// socketio //
import io from "socket.io-client";
export const socket = io.connect("http://localhost:8080");

const AppRoutes = (props) => {
  const [clientConnected, setClientConnected] = useState(false);

  const sendDisconnectEvent = () => {
    socket.disconnect();
  };

  return (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={adminRoutes.ADMIN} exact={false} component={AdminComponent} />
        <Route path={adminRoutes.ADMIN_LOGIN} exact={true} component={AdminLoginComponent} />
        <Route path={appRoutes.HOME_ROUTE} exact={true} component={HomeComponent} />
       </Switch>
    </Router>
  </Provider> 
  );
}

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
