// @flow 
import * as React from "react";
import { useTranslation } from "react-i18next";
// react bootstrap //
import { Carousel, Col, Container, Row } from "react-bootstrap";
// addtional components //
import { HomePageServiceCard } from "./HomePageServiceCard";
// type //
import type { RouterHistory } from "react-router-dom";
import type { RoomState } from "../../../../redux/reducers/rooms/flowTypes";
import type { ServiceState } from "../../../../redux/reducers/service/flowTypes";
import type { DiningEntertainmentState } from "../../../../redux/reducers/dining_entertainment/flowTypes";

// styles and css //
import styles from "./css/homePageServices.module.css";

type Props = {
  history: RouterHistory;
  roomState: RoomState;
  serviceState: ServiceState;
  diningEntertainmentState: DiningEntertainmentState;
};
type LocalState = {
  showMobileView: boolean
};

export const HomePageServices = ({ history, roomState, serviceState, diningEntertainmentState }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ showMobileView: false });
  const [ translateFunction, i18n ] = useTranslation();

  // event listeners //
  const listenToWindowResize = () => {
    if (window.innerWidth < 550) {
      setLocalState({ showMobileView: true });
    } else {
      setLocalState({ showMobileView: false });
    }
  }
  // redirect handlers //
  const goToRooms = () => {
    history.push("/rooms");
  };
  const goToDiningEntertainment = () => {
    history.push("/dining");
  };
  const goToServices = () => {
    history.push("/services");
  };

  // lifecycle hooks //
  React.useEffect(() => {
    // event listener for screen size //
    window.addEventListener("resize", listenToWindowResize);
    //
    if (window.innerWidth < 550) {
      setLocalState({ showMobileView: true });
    }
    return () => {
      window.removeEventListener("resize", listenToWindowResize);
    }
  }, []);

  return (
    <section className={ `bg-light page-section ${ styles.portfolioSection }`} id="portfolio">
      <Container fluid className={ styles.portfolioContainer }>
        <Row>
          <Col lg={ 12 } xs={ 12 } className={ styles.headerCol }>
            <h2 className={` ${"section-heading text-uppercase"} ${styles.headerText}`}>{ translateFunction("exploreTitle") }</h2>
            <h3 className="section-subheading text-muted">{ translateFunction("servicesDesc") }</h3>
          </Col>
        </Row>
        {
          localState.showMobileView 
          ?
          <Row className={ styles.mobileViewRow }>
            <Col md={12} className={ styles.carouselCol }>
              <Carousel className={ styles.mobileViewCarousel } interval={ null }>
                <Carousel.Item key="room" className={ styles.carouselItem }>
                  <div className={`portfolio-item ${styles.carouselItemInner}`} >
                    <HomePageServiceCard modelType="room" modelData={ roomState.createdRooms[0] } handleHomePageServiceClick={ goToRooms } translateFunction={ translateFunction } />
                  </div>
                </Carousel.Item>
                <Carousel.Item key="dining" className={ styles.carouselItem }>
                  <div className={`portfolio-item ${styles.carouselItemInner}`}>
                    <HomePageServiceCard modelType="dining"  modelData={ diningEntertainmentState.createdDiningEntModels[0] } handleHomePageServiceClick={ goToDiningEntertainment } translateFunction={ translateFunction } />
                  </div>
                </Carousel.Item>
                <Carousel.Item key="service" className={ styles.carouselItem }>
                  <div className={`portfolio-item ${styles.carouselItemInner}`}>
                    <HomePageServiceCard modelType="service" modelData={ serviceState.createdServices[0] } handleHomePageServiceClick={ goToServices } translateFunction={ translateFunction } />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
          :
          <Row className={ `${styles.colViewRow}`}>
            <Col lg={4} md={6} className={`portfolio-item ${styles.itemCol}`}>
              <HomePageServiceCard key="room" modelType="room" modelData={ roomState.createdRooms[0] } handleHomePageServiceClick={ goToRooms } translateFunction={ translateFunction } />
            </Col>
            <Col lg={4} md={6} className={`portfolio-item ${styles.itemCol}`}>
              <HomePageServiceCard key="dining" modelType="dining" modelData={ diningEntertainmentState.createdDiningEntModels[0] } handleHomePageServiceClick={ goToDiningEntertainment } translateFunction={ translateFunction } />
            </Col>
            <Col lg={4} md={6} className={`portfolio-item ${styles.itemCol}`}>
              <HomePageServiceCard key="service" modelType="service" modelData={ serviceState.createdServices[0] } handleHomePageServiceClick={ goToServices } translateFunction={ translateFunction } />
            </Col>
          </Row>
        } 
      </Container>
    </section>
  );
};