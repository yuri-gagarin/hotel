import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
// component imports //
import { HomePageServices } from "./services/home_page/HomePageServices";
import NavbarComponent from "./navbar/NavbarComponent";
import MainHeaderComponent from "./main_header/MainHeaderComponent";
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
    _id: ObjectID.generate(Date.now()).toString(),
    firstName: "guest",
    email: null
  };
};

const HomeComponent = (props) => {
  const { 
    history, appGeneralState, clientState,
    _clearAppError, _clearSuccessState,
    _setGuestClient
  } = props;
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(null);

  const unloadWindowHandler = () => {
    socket.emit("clientLeaving", clientState);
  };
  // set default client info on initial load //
  useEffect(() => {
    // automatic form clear for error //
    (function () {
      // Collapse Navbar
      var navbarCollapse = function () {
        const nav = $("#mainNav");
        if (nav && nav.offset()) {
          if (nav.offset().top > 100) {
            nav.addClass("navbar-shrink");
          } else {
            nav.removeClass("navbar-shrink");
          }
        } else {
          return;
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);
    })();
    // check for saved user data in localStorage //
    const clientId = localStorage.getItem("hotelGuestClientId");
    const firstName = localStorage.getItem("hotelGuestClientName");
    if (clientId && firstName) {
      _setGuestClient({ _id: clientId, firstName: firstName });
    } else {
      _setGuestClient(handleNewClient());
    }
  }, []); 
  // error and success component triggers //
  useEffect(() => {
    const { error, successComponentOpen } = appGeneralState;
    if (error) {
      setErrorTimeout(
        setTimeout(() => {
          _clearAppError();
        }, 5000)
      );
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
     // setErrorTimeout(null);
    }
    if (successComponentOpen) {
      setSuccessTimeout(
        setTimeout(() => {
          _clearSuccessState();
        }, 5000)
      );
    }
    if (!successComponentOpen && successTimeout) {
      clearTimeout(successTimeout);
      //setSuccessTimeout(null);
    }
    return function () {
      if (successTimeout) {
        clearTimeout(successTimeout);

      }
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    }
  }, [ appGeneralState ]);
  // set localStorage items if they do not exist //
  // listener for closed window or navigation away //
  useEffect(() => {
    const storedId = localStorage.getItem("hotelGuestClientId");
    const storedName = localStorage.getItem("hotelGuestClientName");
    const { _id, firstName } = clientState;
    if ( _id && firstName ) {
      if (!storedId || !storedName) {
        localStorage.setItem("hotelGuestClientId", _id);
        localStorage.setItem("hotelGuestClientName", firstName);
      }
      window.addEventListener("beforeunload", unloadWindowHandler);
      // emit client information to the server //
      socket.emit("sendClientCredentials",  clientState);
    }
  }, [clientState])
   
  return (
    <div style={{ width: "100vw", height: "auto"}}>
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={_clearSuccessState} />
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={_clearAppError} />
      <NavbarComponent />
      <MainHeaderComponent />
      <BookingForm />
      <HomePageServices history={ history } />
      <ContactForm />
      <MessageFormContainer />
      <Footer history={ history } />
    </div>
  );
};
// PropTypes validation //
HomeComponent.propTypes = {
  //socket: PropTypes.object.isRequired
  appGeneralState: PropTypes.object.isRequired,
  clientState: PropTypes.object.isRequired,
  _setGuestClient: PropTypes.func.isRequired,
  _clearAppError: PropTypes.func.isRequired,
  _clearSuccessState: PropTypes.func.isRequired
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
    _clearAppError: () => dispatch(clearAppError()),
    _clearSuccessState: () => dispatch(clearSuccessState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));