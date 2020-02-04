/* global jQuery, define */
import React from 'react';
import "./assets/theme/vendor/jquery/jquery";
import "./assets/theme/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/theme/vendor/fontawesome-free/css/all.css";
import "./assets/theme/vendor/jquery/jquery.js"
import "./assets/theme/agency.css";
import './App.css';
import { Button } from 'react-bootstrap';

import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <HomeComponent />
  );
}

export default App;
