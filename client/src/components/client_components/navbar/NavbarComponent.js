import React from "react";
import { useTranslation } from "react-i18next";
// react router imports //
import { withRouter } from "react-router-dom";

const style = {
  //border: "3px solid green",
}
const NavbarComponent = (props) => {
  const { history } = props;
  const [t, i18n] = useTranslation();

  // navbar handlers //
  const goToBooking = () => {
    let bookinView = document.getElementById("booking");
    bookinView.scrollIntoView();
  };
  const goToServices = (e) => {
    let servicesView = document.getElementById("portfolio");
    if (servicesView) {
      servicesView.scrollIntoView();
    } else {
      history.push("/services");
    }
  };

  const goToContactForm = (e) => {
   let contactForm = document.getElementById("contact");
   contactForm.scrollIntoView();
  };

  const goToHome = () => {
    history.push("/");
  };

  const changeLanguage = (e) => {
    const language = (e.target.text);
    switch (language) {
      case "EN": {
        i18n.changeLanguage("en");
        break;
      };
      case "UA": {
        i18n.changeLanguage("uk");
        break;
      };
      case "RU": {
        i18n.changeLanguage("ru");
        break;
      };
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={style} id="mainNav">
      <div className="container">
        <a 
          className="navbar-brand js-scroll-trigger" 
          onClick={goToHome}
          style={{ cursor: "pointer" }}
          >
          {t("title")}
        </a>
        <button className="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarLanguage" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Language
          <i className="fas fa-bars"></i>
        </button>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars"></i>
        </button>
       
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ml-auto" style={{ cursor: "pointer "}}>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" onClick={goToBooking}>{t("resTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" onClick={goToServices}>{t("servicesTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger">{t("newsTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" onClick={goToContactForm}>{t("contactTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger">{t("aboutTitle")}</a>
            </li>
          </ul>
        </div>
       
        <div className="collapse navbar-collapse" id="navbarLanguage">
          <ul className="navbar-nav mx-auto" style={{cursor: "pointer"}}>
            <li className="nav-item">
              <a className="nav-link" onClick={changeLanguage}>UA
                <img src="/assets/images/flags/ua_flag.svg" style={{ height: "25px", width: "25px" }}></img>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={changeLanguage}>EN
                <img src="/assets/images/flags/uk_flag.svg" style={{ height: "25px", width: "25px" }}></img>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={changeLanguage}>RU
                <img src="/assets/images/flags/ru_flag.svg" style={{ height: "25px", width: "25px" }}></img>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavbarComponent);