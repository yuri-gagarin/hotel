import React from "react";
import { useTranslation } from "react-i18next";

const  MainHeaderComponent = (props) => {
  const [t, i18n] = useTranslation();

 
  return (
    <header className="masthead">
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in">{t("title")}</div>
          <div className="intro-heading text-uppercase">{t("welcome")}</div>
          <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">{t("more")}</a>
        </div>
      </div>
    </header>
  );
};

export default MainHeaderComponent;