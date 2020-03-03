import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// redux imports //
import { connect } from "react-redux";
import { sendContactFormData } from "./../../redux/actions/contactPostActions"; 
import { setAppError } from "../../redux/actions/appGeneralActions";

const ContactForm = (props) => {
  const { contactPostState, sendContactFormData, setAppError } = props;
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
    return sendContactFormData(formState)
      .then((success) => {
        if (success) {
          setFormState({
            ...formState,
            name: "",
            email: "",
            phoneNumber: "",
            content: ""
          });
        }
      });
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
                      placeholder={t("contactName")}
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
                      placeholder={t("contactEmail")}
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
                      placeholder={t("contactPhone")}
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
                      placeholder={t("contactMsg")}
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
// PropTypes validation //
ContactForm.propTypes = {
  contactPostState: PropTypes.object.isRequired,
  sendContactFormData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    contactPostState: state.contactPostState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendContactFormData: (formData) => sendContactFormData(dispatch, formData),
    setAppError: (errorData) => dispatch(setAppError(errorData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);