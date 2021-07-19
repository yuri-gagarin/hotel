// @flow
import * as React from "react";
import { useTranslation } from "react-i18next";
// additonal components //
import { HomeScreenNav } from "./HomeScreenNav";
import { NonHomeScreenNav } from "./NonHomeScreenNav";
// react router imports //
import { withRouter } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
// 
import styles from "./css/generalNavStyles.module.css";

type WrapperProps = {
  hidden?: boolean;
};
type Props = {
  ...WrapperProps;
  history: RouterHistory;
}
type ReactObjRef = {| current: ( HTMLDivElement | null ) |};

const scrolltoElement = ({ elementId }: { elementId: string }): void => {
  const el = document.getElementById(elementId);
  console.log(document.body ? document.body.scrollHeight : 0)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "end" });
  } 
};

const closeMobileMenus = (refs: Array<ReactObjRef>): void => {
  for (const ref of refs) {
    if (ref.current) {
      ref.current.classList.remove("show");
    }
  }
}

const NavbarComponent = ({ history, hidden }: Props): React.Node => {
  const [ t, i18n ] = useTranslation();
  const [ navState, setNavState ] = React.useState<{ useHomeScreenNav: boolean, height: string }>({ useHomeScreenNav: false, height: "auto" });
  // refs //
  const mainMenuRef = React.useRef<HTMLDivElement | null>(null);
  const languageMenuRef = React.useRef<HTMLDivElement | null>(null);
  // lifecycle hooks //
  const scrollListener = () => {
    const el = document.getElementById("booking");
    /*
    if (document.body && el) {

    }
    */
  }
  React.useEffect(() => {
    const currentPath = history.location.pathname;
    if (currentPath === "/") {
      setNavState({ useHomeScreenNav: true, height: "auto" });
    } else {
      setNavState({ useHomeScreenNav: false, height: "auto" })
    }
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    }
  }, [])


  const changeLanguage = (e) => {
    const language = e.target.dataset.lang.toLowerCase();
    switch (language) {
      case "en": {
        i18n.changeLanguage("en");
        closeMobileMenus([ mainMenuRef, languageMenuRef ]);
        break;
      }
      case "uk": {
        i18n.changeLanguage("uk");
        closeMobileMenus([ mainMenuRef, languageMenuRef ]);
        break;
      }
      case "ru": {
        i18n.changeLanguage("ru");
        closeMobileMenus([ mainMenuRef, languageMenuRef ]);
        break;
      }
    }
  };

  const handleGoHome = () => {
    history.push("/");
  };
  /* condtional scroll actions */
  const goToBooking = () => {
    const { pathname } = history.location;
    if (pathname === "/") {
      closeMobileMenus([ mainMenuRef, languageMenuRef ]);
      scrolltoElement({ elementId: "booking" });
    } else {
      closeMobileMenus([ mainMenuRef, languageMenuRef ]);
      history.push("/");
      setTimeout(() => {
        scrolltoElement({ elementId: "booking" });
      }, 100)
    }
  };
  const scrollToHotelOptions = () => {
    let hotelOptionsVew = document.getElementById("portfolio");
    if (hotelOptionsVew) {
      closeMobileMenus([ mainMenuRef, languageMenuRef ]);
      scrolltoElement({ elementId: "portfolio" });
    }
  };
  
  const goToContactForm = () => {
    const { pathname } = history.location;
    if (pathname === "/") {
      closeMobileMenus([ mainMenuRef, languageMenuRef ]);
      scrolltoElement({ elementId: "contact" });
    } else {
      closeMobileMenus([ mainMenuRef, languageMenuRef ]);
      history.push("/");
      setTimeout(() => {
        scrolltoElement({ elementId: "contact" });
      }, 100);
    }
  };

  // to close mobile menu on click //
  const handleMobileMenusClose = (): void => {
    closeMobileMenus([ mainMenuRef, languageMenuRef ]);
  };
  // hotel news route //
  const goToNews = () => {
    closeMobileMenus([ mainMenuRef, languageMenuRef ]);
    history.push("/news");
  };
  const goToAbout = () => {
    closeMobileMenus([ mainMenuRef, languageMenuRef ]);
    history.push("/about");
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.clientNavbar} ${ navState.useHomeScreenNav ? "" : styles.nonHomeScreenNav} ${ hidden ? styles.hidden : "" }`} id="mainNav" style={{ height: navState.height }}>
      <a 
        className="navbar-brand js-scroll-trigger" 
        onClick={ handleGoHome }
        style={{ cursor: "pointer" }}
        >
        {t("title")}
      </a>
      {
        /*
        <button className={ `navbar-toggler navbar-toggler-left ${styles.languageNavBtn}` } type="button" data-toggle="collapse" data-target=".multiCollapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Language
          <i className="fas fa-bars"></i>
        </button>
        */

      }
     
      <button className={`navbar-toggler .navbar-left`} type="button" data-toggle="collapse" data-target=".multi-collapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i className="fas fa-bars"></i>
      </button>
      {
        navState.useHomeScreenNav 
        ? <HomeScreenNav 
            customRef={ mainMenuRef }
            history={ history }
            goToBooking={ goToBooking }
            goToOptions={ scrollToHotelOptions }
            goToContactForm={ goToContactForm }
            goToNews={ goToNews }
            goToAbout={ goToAbout }
          />
        : <NonHomeScreenNav 
            customRef={ mainMenuRef }
            history={ history }
            handleMobileMenusClose={ handleMobileMenusClose }
            goToBooking={ goToBooking }
            goToContactForm={ goToContactForm }
            goToNews={ goToNews }
            goToAbout={ goToAbout }
          />
      }
      <div className={`collapse navbar-collapse multi-collapse` } ref={ languageMenuRef }>
        <ul className="navbar-nav ml-auto" style={{cursor: "pointer"}}>
          <li className="nav-item">
            <a className="nav-link"  onClick={ changeLanguage } data-lang="uk">UA
              <img src="/assets/images/flags/ua_flag.svg" data-lang="uk" style={{ height: "25px", width: "25px" }}></img>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={ changeLanguage }  data-lang="en">EN
              <img src="/assets/images/flags/uk_flag.svg" data-lang="en" style={{ height: "25px", width: "25px" }}></img>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={ changeLanguage }  data-lang="ru">RU
              <img src="/assets/images/flags/ru_flag.svg" data-lang="ru" style={{ height: "25px", width: "25px" }}></img>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default (withRouter(NavbarComponent): React.AbstractComponent<WrapperProps>);