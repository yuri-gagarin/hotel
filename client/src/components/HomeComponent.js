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
// redux imports //
import { connect } from "react-redux";

// additional imports //
import ObjectID from "bson-objectid";
import { setGuestClient } from "../redux/actions/clientActions";
import { socket } from "../App";


class HomeComponent extends React.Component {
  //const [client, setClient] = useState(setUser(handleClient));
  constructor (props) {
    super(props);
    this.props.handleClient({
      userId: ObjectID.generate(Date.now),
      name: "Guest",
      emaul: null
    });
  }
  
  componentDidMount() {
    //setUser();
    (function() {
      "use strict"; // Start of use strict
      // Smooth scrolling using jQuery easing
      /*
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 54)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
      });
      */
      // Closes responsive menu when a scroll trigger link is clicked
      //$('.js-scroll-trigger').click(function() {
       // $('.navbar-collapse').collapse('hide');
      //});
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
  render () {
    return (
      <React.Fragment>
        <NavbarComponent />
        <MainHeaderComponent />
        <BookingForm />
        <ServicesComponent />
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
    clientState: state.clientState
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleClient: (userData) => dispatch(setGuestClient(userData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);