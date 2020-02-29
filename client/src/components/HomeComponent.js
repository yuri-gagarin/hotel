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
import SuccessComponent from "./display_components/SuccessComponent";
import ErrorComponent from "./display_components/ErrorComponent";
// redux imports //
import { connect } from "react-redux";
import { clearAppError } from "../redux/actions/appErrorActions";
import store from "../redux/store";
// react router //
import { withRouter } from "react-router-dom";
// additional imports //
import ObjectID from "bson-objectid";
import { setGuestClient } from "../redux/actions/clientActions";
import { socket } from "../App";


class HomeComponent extends React.Component {
  //const [client, setClient] = useState(setUser(handleClient));
  constructor (props) {
    super(props);
    this.state = {};
    this.props.handleClient({
      userId: ObjectID.generate(Date.now),
      firstName: "Guest",
      email: null
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { appErrorState } = nextProps;
    const { error } = appErrorState;
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        store.dispatch(clearAppError());
      }, 5000)
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
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
    const { history, appErrorState, clearAppError } = this.props;
    return (
      <React.Fragment>
        <SuccessComponent/>
        <ErrorComponent appErrorState={appErrorState} clearAppError={clearAppError} />
        <NavbarComponent />
        <MainHeaderComponent />
        <BookingForm />
        <ServicesComponent history={history} />
        <ContactForm />
        <MessageFormContainer />
        <Footer />
      </React.Fragment>
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
    appErrorState: state.appErrorState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleClient: (userData) => dispatch(setGuestClient(userData)),
    clearAppError: () => dispatch(clearAppError())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));