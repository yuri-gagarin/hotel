import React from "react";
import $ from "jquery";
// component imports //
import NavbarComponent from "./navbar/NavbarComponent";
import MainHeaderComponent from "./main_header/MainHeaderComponent";
import ServicesComponent from "./services/ServicesComponent";
import ContactForm from "./forms/ContactForm";
import Footer from "./footer/Footer";
import BookingForm from "./forms/BookingForm";


class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (function() {
      "use strict"; // Start of use strict
    
      // Smooth scrolling using jQuery easing
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
    
      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
      });
      // console.log($("body"));
      // Activate scrollspy to add active class to navbar items on scroll
      //$('body').scrollspy({
      //  target: '#mainNav',
      //  offset: 56
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
  render() {
    return (
    <React.Fragment>
      <NavbarComponent />
      <MainHeaderComponent />
      <BookingForm />
      <ServicesComponent />
      <ContactForm />
      <Footer />
    </React.Fragment>
    );
  }
};

export default HomeComponent;