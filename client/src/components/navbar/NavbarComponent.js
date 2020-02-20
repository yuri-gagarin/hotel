import React from "react";
import { useTranslation } from "react-i18next";

const style = {
  //border: "3px solid green",
}
const NavbarComponent = (props) => {
  
  const [t, i18n] = useTranslation();

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
        <a className="navbar-brand js-scroll-trigger" href="#page-top">{t("title")}</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <button className="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarLanguage" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Language
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarLanguage">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={changeLanguage} style={{cursor: "pointer"}}>UA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={changeLanguage} style={{cursor: "pointer"}}>EN</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={changeLanguage} style={{cursor: "pointer"}}>RU</a>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#services">{t("resTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#portfolio">{t("servicesTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">{t("newsTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#team">{t("contactTitle")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#contact">{t("aboutTitle")}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;