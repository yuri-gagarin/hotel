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

}
const HomeComponent = (props) => {
  const { 
    history, appGeneralState, 
    clearAppError, clearSuccessState 
  } = props;
  const [client, setClient] = useState({});
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(null);

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
    // inform server of new client //
    socket.on("askForCredentials", () => {
      socket.emit("sendClientCredentials", { user: "user" });
    });
    return function () {
      localStorage.removeItem("clientId");
      localStorage.removeItem("conversationId");
    }
  }, []);
  
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
    handleClient: (userData) => dispatch(setGuestClient(userData)),
    clearAppError: () => dispatch(clearAppError()),
    clearSuccessState: () => dispatch(clearSuccessState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));