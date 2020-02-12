/* global jQuery, define */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
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

const AppRoutes = (props) => {
  return (
    <Router>
      <Switch>
        <Route path={adminRoutes.ADMIN_DASH} exact={true} component={AdminComponent} />
        <Route path={adminRoutes.ADMIN_LOGIN} exact={true} component={AdminLoginComponent} />
        <Route path={appRoutes.HOME_ROUTE} exact={true} component={HomeComponent} />
       </Switch>
    </Router>
  );
}

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
