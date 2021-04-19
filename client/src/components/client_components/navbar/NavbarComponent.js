// @flow
import * as React from "react";
import { useTranslation } from "react-i18next";
// additonal components //
import { HomeScreenNav } from "./HomeScreenNav";
import { NonHomeScreenNav } from "./NonHomeScreenNav";
// react router imports //
import { withRouter } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";

type Props = {
  history: RouterHistory
};

const scrolltoElement = ({ elementId } : { elementId : string }): void => {
  const el = document.getElementById(elementId);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const NavbarComponent = ({ history } : Props): React.Node => {
  const [ t, i18n ] = useTranslation();
  const [ navState, setNavState ] = React.useState<{ useHomeScreenNav: boolean, height: string }>({ useHomeScreenNav: false, height: "auto" });

  React.useEffect(() => {
    const currentPath = history.location.pathname;
    if (currentPath === "/") {
      setNavState({ useHomeScreenNav: true, height: "auto" });
    } else {
      setNavState({ useHomeScreenNav: false, height: "50px" })
    }
  }, [])

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

  const handleGoHome = () => {
    history.push("/");
  };
  /* condtional scroll actions */
  const goToBooking = () => {
    const { pathname } = history.location;
    if (pathname === "/") {
      scrolltoElement({ elementId: "booking" });
    } else {
      history.push("/");
      setTimeout(() => {
        scrolltoElement({ elementId: "booking" });
      }, 100)
    }
  };
  const goToContactForm = () => {
    const { pathname } = history.location;
    if (pathname === "/") {
      scrolltoElement({ elementId: "contact" });
    } else {
      history.push("/");
      setTimeout(() => {
        scrolltoElement({ elementId: "contact" });
      }, 100);
    }
  };
  // hotel news route //
  const goToNews = () => {
    history.push("/news");
  };
  const goToAbout = () => {
    history.push("/about");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style={{ height: navState.height }}>
      <a 
        className="navbar-brand js-scroll-trigger" 
        onClick={ handleGoHome }
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
      {
        navState.useHomeScreenNav 
        ? <HomeScreenNav 
            history={ history }
            goToBooking={ goToBooking }
            goToContactForm={ goToContactForm }
            goToNews={ goToNews }
            goToAbout={ goToAbout }
          />
        : <NonHomeScreenNav 
            history={ history }
            goToBooking={ goToBooking }
            goToContactForm={ goToContactForm }
            goToNews={ goToNews }
            goToAbout={ goToAbout }
          />
      }
      <div className="collapse navbar-collapse" id="navbarLanguage">
        <ul className="navbar-nav ml-auto" style={{cursor: "pointer"}}>
          <li className="nav-item">
            <a className="nav-link" onClick={ changeLanguage }>UA
              <img src="/assets/images/flags/ua_flag.svg" style={{ height: "25px", width: "25px" }}></img>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={ changeLanguage }>EN
              <img src="/assets/images/flags/uk_flag.svg" style={{ height: "25px", width: "25px" }}></img>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={ changeLanguage }>RU
              <img src="/assets/images/flags/ru_flag.svg" style={{ height: "25px", width: "25px" }}></img>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default (withRouter(NavbarComponent): React.AbstractComponent<{}>);