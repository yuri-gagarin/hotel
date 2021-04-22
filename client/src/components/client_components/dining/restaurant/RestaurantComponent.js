// @flow //
import * as React from "react";
import { useTranslation } from "react-i18next";
// bootstrap components //
import { Container, Col, Image, Row } from "react-bootstrap";
// additional components //
import { FlipImgComponent } from "../../shared/FlipImgComponent";
// styles and css //
import styles from "./css/restaurantComponent.module.css";
// types //
import type { DiningEntModelAction, DiningEntModelData } from "../../../../redux/reducers/dining_entertainment/flowTypes";
import type { Dispatch } from "../../../../redux/reducers/_helpers/createReducer";
// helpers //
import { setComponentValues } from "../hepers/defaultValues";
import { setDefaultURLS } from "../hepers/setDefaultUrls";
import { setImagePath, setStringTranslation } from "../../../helpers/displayHelpers";

type Props = {
  diningOption: DiningEntModelData
};

type LocalState = {
  animationTriggered: boolean,
  imageURLS: Array<string>
}

export const RestaurantComponent = ({ diningOption } : Props): React.Node => {
  const { title, hours, description } = diningOption;
  const [ localState, setLocalState ] = React.useState<LocalState>({ animationTriggered: false, imageURLS: [] });
  const [ t, i18n ]= useTranslation();
  const componentRef = React.useRef<HTMLElement | null>(null);
  //

  const handleComponentScroll = () => {
    if (componentRef.current) {
      const compPosY = componentRef.current.getBoundingClientRect().top;
      const screenHeight = window.screen.height;
      if (compPosY < (screenHeight / 3)) {
        setLocalState({ ...localState, animationTriggered: true });
        window.removeEventListener("scroll", handleComponentScroll);
      }
    }
  }
  // lifecycle hooks //
  React.useEffect(() => {
    const imgURLS: Array<string> = setDefaultURLS(diningOption.images);
    setLocalState({ ...localState, imageURLS: imgURLS });
  }, [ diningOption ]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleComponentScroll);
    return () => { window.removeEventListener("scroll", handleComponentScroll) };
  }, [ componentRef.current ]);

  return (
    <Container fluid ref={ componentRef }>
      <Row className={ styles.restaurantCompTitleRow}>
        <div className={ styles.restaurantTitleDiv}>
          <p className={ styles.restaurantTitleContent}>{ title ? title : "No Title.." }</p>
        </div>
        <div className={ styles.rowBorder }></div>
      </Row>
      <Row className={ styles.restaurantComponentRow }>
        <Col lg={8} md={12} className={ styles.restaurantComponentPictureCol }>
          <Container fluid className={ styles.leftPicContainer }>
            <Row className={ `${styles.leftPicUpperRow} ${localState.animationTriggered ? styles.flipAnimate : ""}` }>
              <FlipImgComponent genericImgData={ diningOption.images[0]} triggerFlipAnimate={ true } />
            </Row>
            <Row className={ `${styles.leftPicLowerRow} ${localState.animationTriggered ? styles.flipAnimate : ""}` }>
              <FlipImgComponent genericImgData={ diningOption.images[1]} triggerFlipAnimate={ true } />
            </Row>
          </Container>
          <Container fluid className={ styles.rightPicContainer }>
            <Row className={ styles.rightPicRow }>
              <img className={ styles.rightImage } src={ setImagePath() } />
            </Row>
          </Container>
        </Col>
        
        <Col lg={4} md={12} className={ styles.restaurantComponentDescCol }>
          <div className={ styles.restaurantDescWrapper }>
            <div className={ styles.restaurantDescWrapperLeft }>
              <div className={ styles.restaurantDescriptionDiv }>
                <p>{ description ? setStringTranslation(description, i18n) : "No description provided" }</p>
              </div>
              <div className={ styles.restaurantHoursDiv}>
                <i className="far fa-clock"></i>
                <span>Open hours:</span>
                <span>{ hours ? hours : "No hours provided" }</span>
              </div>
            </div>
            <div className={ styles.restaurantDescWrapperRight }>
              <span>
                <i className="fas fa-utensils"></i>
                <span>Menu</span>
              </span>
              <span>
                <i className="fas fa-phone"></i>
                <span>Call</span>
              </span>
              <span>
                <i className="far fa-envelope"></i>  
                <span>Email</span>            
              </span>
              <span>
                <i className="fab fa-instagram"></i>
                <span>Insta</span>            
              </span>
              <span>
                <i className="fab fa-facebook"></i>
                <span>Social</span>
              </span>
            </div>
          </div>
         
        </Col>
      </Row>
    </Container>
  );
};