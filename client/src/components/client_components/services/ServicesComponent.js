// @flow
import * as React from "react";
import { Button } from "react-bootstrap";
import roomDefault from "./../../../static_images/services_images/room_default.jpg";
import restaurantDefault from "./../../../static_images/services_images/restaurant_default.jpg";
// FLOW types //
import type { RouterHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
// css
import styles from './css/servicesComponent.module.css';

type Props = {
  history: RouterHistory;
}
const ServicesComponent = ({ history } : Props):React.Node => {
  const [t] = useTranslation();

  const handleRoomsClick = (e) => {
    history.push("/rooms");
  };
  const handleDiningEntertainmentClick = (e) => {
    history.push("/dining");
  };
  const handleServicesClick = (e) => {
    history.push("/services");
  };
  return (
    <section className={ `bg-light page-section ${styles.portfolioSection}`} id="portfolio">
      <div className= { `container fluid ${styles.portfolioContainer}`}>
        <div className="row" >
          <div className="col-lg-12 col-xs-12 text-center">
            <h2 className={` ${"section-heading text-uppercase"} ${styles.headerText}`}>{t("exploreTitle")}</h2>
            <h3 className="section-subheading text-muted">{t("servicesDesc")}</h3>
          </div>
        </div>
        <div className="row">
          <div className={ `${'col-md-4 col-sm-12 portfolio-item'} ${styles.portfolioItem} `}>
            <div className={ styles.portfolioItemInner }>
              <a className={ `portfolio-link ${styles.portfolioItemPicLink}` } data-toggle="modal" href="#portfolioModal1" onClick={handleRoomsClick}> 
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img className="img-fluid" src={roomDefault} alt="" />
              </a>
              <div  className={ `portfolio-caption ${styles.portfolioItemPicDesc}` }>
                <h4>{t("roomsTitle")}</h4>
                <p className="text-muted">{t("roomsDesc")}</p>
                <Button className={ styles.portfolioBtn } variant="outline-info" onClick={handleRoomsClick}>{t("buttons.goToRoomsBtn")}</Button>
              </div>
            </div>
          </div>
          <div className={ `${'col-md-4 col-sm-12 portfolio-item'} ${styles.portfolioItem} `}>
            <div className={ styles.portfolioItemInner }>
              <a className={ `portfolio-link ${styles.portfolioItemPicLink}` } data-toggle="modal" href="#portfolioModal2" onClick={handleDiningEntertainmentClick}>
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img className="img-fluid" src={restaurantDefault} alt="" />
              </a>
              <div className={ `portfolio-caption ${styles.portfolioItemPicDesc}` }>
                <h4>{t("dining_entertainment")}</h4>
                <p className="text-muted">{t("restDesc")}</p>
                <Button className={ styles.portfolioBtn } variant="outline-info" onClick={handleDiningEntertainmentClick}>{t("buttons.goToDiningBtn")}</Button>
              </div>
            </div>
          </div>
          <div className={ `${'col-md-4 col-sm-12 portfolio-item'} ${styles.portfolioItem} `}>
            <div className={ styles.portfolioItemInner }>
              <a className={ `portfolio-link ${styles.portfolioItemPicLink}` } data-toggle="modal" href="#portfolioModal3" onClick={handleServicesClick}>
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img className="img-fluid" src={roomDefault} alt="" />
              </a>
              <div className={ `portfolio-caption ${styles.portfolioItemPicDesc}` }>
                <h4>{t("extras")}</h4>
                <p className="text-muted">{t("extrasDesc")}</p>
                <Button className={ styles.portfolioBtn } variant="outline-info" onClick={handleServicesClick}>{t("buttons.goToExtrasBtn")}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;