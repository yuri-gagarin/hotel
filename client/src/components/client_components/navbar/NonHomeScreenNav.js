// @flow
import * as React from "react";
import { useTranslation } from "react-i18next";
// styles an css //
import generalStyles from "./css/generalNavStyles.module.css";
// types //
import type { RouterHistory } from "react-router-dom";

type Props = {
  history: RouterHistory,
  goToBooking: () => void,
  goToContactForm: () => void,
  goToNews: () => void,
  goToAbout: () => void
};

export const NonHomeScreenNav = ({ history, goToBooking, goToContactForm, goToNews, goToAbout }: Props): React.Node => {
  const [t] = useTranslation();

  
  const goToRooms = () => {
    history.push("/rooms");
  };
  const goToDiningEntertainment = () => {
    history.push("/dining");
  };
  const goToServices = () => {
    history.push("/services");
  };


  return (
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav text-uppercase ml-auto" id={ generalStyles.navbarLeft }>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToBooking }>{t("book")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToRooms }>{t("roomsTitle")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToDiningEntertainment }>{t("dining_entertainment")}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" onClick={ goToServices }>{t("additional_services")}</a>
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