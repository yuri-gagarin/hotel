// @flow 
import * as React from "react";
import { useTranslation } from "react-i18next";
//
import generalStyles from "./css/generalNavStyles.module.css";
// types /
import type { RouterHistory } from "react-router-dom";

type Props = {
  history: RouterHistory,
  goToBooking: () => void,
  goToContactForm: () => void,
  goToNews: () => void,
  goToAbout: () => void
};

export const HomeScreenNav = ({ history, goToBooking, goToContactForm, goToNews, goToAbout }: Props): React.Node => {
  const [t] = useTranslation();


  const scrollToHotelOptions = () => {
    let hotelOptionsVew = document.getElementById("portfolio");
    if (hotelOptionsVew) {
      hotelOptionsVew.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav text-uppercase" id={ generalStyles.navbarLeft }>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToBooking }>{t("resTitle")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ scrollToHotelOptions }>{t("exploreTitle")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToNews }>{t("newsTitle")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToContactForm }>{t("contactTitle")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToAbout }>{t("aboutTitle")}</a>
        </li>
      </ul>
    </div>
  );
};