import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
// component imports //
import NavbarComponent from "./navbar/NavbarComponent";
import MainHeaderComponent from "./main_header/MainHeaderComponent";
import ServicesComponent from "./services/ServicesComponent";
import ContactForm from "./forms/ContactForm";
import Footer from "./footer/Footer";
import MessageFormContainer from "./messaging/MessageFormContainer";
import BookingForm from "./forms/BookingForm";
import SuccessComponent from "../display_components/SuccessComponent";
import ErrorComponent from "../display_components/ErrorComponent";
// redux imports //
import { connect } from "react-redux";
import { clearAppError, clearSuccessState } from "../../redux/actions/appGeneralActions";
// react router //
import { withRouter } from "react-router-dom";
// additional imports //
import ObjectID from "bson-objectid";
import { setGuestClient } from "../../redux/actions/clientActions";
// 
import { socket } from "./../../App";

const handleNewClient = () => {
  return {
    _id: ObjectID.generate(Date.now()),
    firstName: "guest",
    email: null
  };
};

const HomeComponent = (props) => {
  const { 
    history, appGeneralState, clientState,
    clearAppError, clearSuccessState,
    _setGuestClient
  } = props;
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(null);

  const unloadWindowHandler = () => {
    socket.emit("clientLeaving", clientState);
  }
  

  useEffect(() => {
    // automatic form clear for error //
    (function() {
      // Collapse Navbar
      var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);
    })();
  }, []);

  useEffect(() => {
    const { error, successComponentOpen } = appGeneralState;
    if (error) {
      setErrorTimeout(() => {
        clearAppError();
      }, 5000);
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
      setErrorTimeout(null);
    }
    if (successComponentOpen) {
      setSuccessTimeout(() => {
        clearSuccessState();
      }, 5000);
    }
    if (!successComponentOpen && successTimeout) {
      clearTimeout(successTimeout);
      setSuccessTimeout(null);
    }

  }, [appGeneralState]);

  useEffect(() => {
    const clientId = localStorage.getItem("hotelGuestClientId");
    const firstName = localStorage.getItem("hotelGuestClientName");
    if (clientId && firstName) {
      _setGuestClient({ _id: clientId, firstName: firstName });
    } else {
      _setGuestClient(handleNewClient());
    }
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("hotelGuestClientId");
    const storedName = localStorage.getItem("hotelGuestClientName");
    const { _id, firstName } = clientState;

    if ( _id && firstName ) {
      if (!storedId && !storedName) {
        localStorage.setItem("hotelGuestClientId", _id);
        localStorage.setItem("hotelGuestClientName", firstName);
      }
      console.log("should set event")
      window.addEventListener("beforeunload", unloadWindowHandler);
      // emit client information to the server //
      socket.emit("sendClientCredentials",  clientState);
    }
  }, [clientState])
   
      
  
  
  return (
    <div style={{ border: "5px solid red", width: "100vw", height: "auto"}}>
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={clearSuccessState} />
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={clearAppError} />
      <NavbarComponent />
      <MainHeaderComponent />
      <BookingForm />
      <ServicesComponent history={history} />
      <ContactForm />
      <MessageFormContainer />
      <Footer />
    </div>
  );
};
// PropTypes validation //
HomeComponent.propTypes = {
  //socket: PropTypes.object.isRequired
  clientState: PropTypes.object.isRequired,
  _setGuestClient: PropTypes.func.isRequired
};

// redux mapping functions //
const mapStateToProps = (state) => {
  return {
    clientState: state.clientState,
    appGeneralState: state.appGeneralState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _setGuestClient: (userData) => dispatch(setGuestClient(userData)),
    clearAppError: () => dispatch(clearAppError()),
    clearSuccessState: () => dispatch(clearSuccessState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));