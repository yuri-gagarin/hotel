import React from "react";
import { useTranslation } from "react-i18next";

const headerStyle = {
  fontFamily: "Lobster",
  fontSize: "3em",
  color: "black"
}
const titleStyle = {
  fontFamily: "PT Serif",
  fontSize: "7em",
  fontWeight: "bold",
  color: "black"
}
const cityStyle = {
  fontFamily: "Pacifico cursive",
  marginTop: "-2%",
  marginBottom: "5%",
  color: "black"
}
const  MainHeaderComponent = (props) => {
  const [t, i18n] = useTranslation();

 
  return (
    <header className="masthead">
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in" style={headerStyle}>{t("title")}</div>
          <div className="intro-heading text-uppercase">{t("welcome")}</div>
          <div className="muted" style={cityStyle}>
              <h2 style={{ fontFamily: "Pacifico" }}>{t("city")}</h2>
            </div>
          <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">{t("more")}</a>
        </div>
      </div>
    </header>
  );
};

export default MainHeaderComponent;