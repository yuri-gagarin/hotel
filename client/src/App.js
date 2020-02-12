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
//import "./assets/theme/vendor/jquery/jquery.js"
//import "./assets/theme/vendor/jquery-easing/jquery.easing.js";
//import "./assets/theme/js/agency";
import "./assets/theme/agency.css";
import "./assets/theme/booking_style.css";
import './App.css';
// import { Button } from 'react-bootstrap';

import HomeComponent from "./components/HomeComponent";
import AdminComponent from './components/admin/AdminComponent';

function App() {
  return (
  <Router>
    <Switch>
      
       <Route path="/administrator" exact={true} component={AdminComponent} />
       <Route path="/">
        <HomeComponent />
       </Route>
    </Switch>
  </Router>
  );
}

export default App;
