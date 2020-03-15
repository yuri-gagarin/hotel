import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import { Container } from "react-bootstrap";
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
import store from "../../redux/store";
// react router //
import { withRouter } from "react-router-dom";
// additional imports //
import ObjectID from "bson-objectid";
import { setGuestClient } from "../../redux/actions/clientActions";


class HomeComponent extends React.Component {
  //const [client, setClient] = useState(setUser(handleClient));
  constructor (props) {
    super(props);
    this.state = {
      errorTimeout: null,
      successTimeout: null
    };
    this.props.handleClient({
      userId: ObjectID.generate(Date.now),
      firstName: "Guest",
      email: null
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { appGeneralState } = nextProps;
    const { error, successComponentOpen } = appGeneralState
    const { errorTimeout, successTimeout } = prevState;
   
    if (error) {
      return {
        errorTimeout: setTimeout(() => {
          store.dispatch(clearAppError());
        }, 5000)
      };
    }
    if (!error && errorTimeout) {
      return {
        errorTimeout: clearTimeout(prevState.errorTimeout)
      };
    }
    if (successComponentOpen) {
      return {
        successTimeout: setTimeout(() => {
          store.dispatch(clearSuccessState());
        }, 5000)
      };
    }
    if (!successComponentOpen && successTimeout) {
      console.log("clearing success timeout")
      return {
        successTimeout: clearTimeout(prevState.successTimeout)
      };
    }
    return prevState;
  }
  
  componentDidMount() {
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
  }
  componentWillUnmount() {
    localStorage.removeItem("clientId");
    localStorage.removeItem("conversationId");
  }
  render () {
    const { history, appGeneralState, clearAppError, clearSuccessState } = this.props;
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
  }
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