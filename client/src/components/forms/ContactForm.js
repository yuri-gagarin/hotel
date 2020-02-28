import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
// redux imports //
import { connect } from "react-redux";
import { } from "./" 

const ContactForm = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    content: ""
  });
  const elementRef = useRef(null);
  // i18n translations //
  const [t, i18n] = useTranslation();
  // form data handlers //
  const handleNameChange = (e) => {
    setFormState({
      ...formState,
      name: e.target.value
    });
  };
  const handleEmailChange = (e) => {
    setFormState({
      ...formState,
      email: e.target.value
    });
  };
  const handlePhoneNumber = (e) => {
    setFormState({
      ...formState,
      phoneNumber: e.target.value
    });
  };
  const handleContent = (e) => {
    setFormState({
      ...formState,
      content: e.target.value
    });
  };
  // submit functionality //
  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormState({
      ...formState,
      name: "",
      email: "",
      phoneNumber: "",
      content: ""
    });
    // api call to send the contact form to the server //
  }
  
  return (
    <section className="page-section" id="contact" ref={elementRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">{t("contactTitle")}</h2>
            <h3 className="section-subheading text-muted">{t("contactDesc")}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form id="contactForm" name="sentMessage" noValidate="novalidate">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      className="form-control" 
                      id="name" type="text" 
                      placeholder="Your Name *" 
                      required="required" 
                      data-validation-required-message="Please enter your name." 
                      value={formState.name}
                      onChange={handleNameChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="form-group">
                    <input 
                      className="form-control" 
                      id="email" type="email" 
                      placeholder="Your Email *" 
                      required="required" 
                      data-validation-required-message="Please enter your email address."
                      value={formState.email}
                      onChange={handleEmailChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="form-group">
                    <input 
                      className="form-control" 
                      id="phone" 
                      type="tel" 
                      placeholder="Your Phone *" 
                      value={formState.phoneNumber}
                      onChange={handlePhoneNumber}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <textarea 
                      className="form-control" 
                      id="message" 
                      placeholder="Your Message *" 
                      required="required" 
                      data-validation-required-message="Please enter a message."
                      value={formState.content}
                      onChange={handleContent}
                      >
                    </textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-lg-12 text-center">
                  <div id="success"></div>
                    <button 
                      id="sendMessageButton" 
                      className="btn btn-primary btn-xl text-uppercase" 
                      type="submit"
                      onClick={handleContactFormSubmit}
                    >
                      {t("sendMsg")}
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;