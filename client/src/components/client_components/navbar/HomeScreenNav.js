// @flow 
import * as React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  goToHome: () => void
};

export const HomeScreenNav = ({ goToHome }: Props): React.Node => {
  const [t] = useTranslation();

  const scrollToBooking = () => {
    let bookinView = document.getElementById("booking");
    if (bookinView) {
      bookinView.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToHotelOptions = () => {
    let hotelOptionsVew = document.getElementById("portfolio");
    if (hotelOptionsVew) {
      hotelOptionsVew.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToContactForm = () => {
    let contactForm = document.getElementById("contact");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <React.Fragment>
      <a 
        className="navbar-brand js-scroll-trigger" 
        onClick={ goToHome }
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
            <a className="nav-link js-scroll-trigger" onClick={ scrollToBooking }>{t("resTitle")}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" onClick={ scrollToHotelOptions }>{t("servicesTitle")}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger">{t("newsTitle")}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" onClick={ scrollToContactForm }>{t("contactTitle")}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger">{t("aboutTitle")}</a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};