// @flow //
import * as React from "react";
// bootstrap components //
import { Container, Col, Image, Row } from "react-bootstrap";
// additional components //
import { flipImgComponent } from "../../shared/FlipImgComponent";
// styles and css //
import styles from "./css/restaurantComponent.module.css";
// types //
import type { DiningEntModelAction, DiningEntModelData } from "../../../../redux/reducers/dining_entertainment/flowTypes";
import type { Dispatch } from "../../../../redux/reducers/_helpers/createReducer";
// helpers //
import { setComponentValues } from "../hepers/defaultValues";
import { setImagePath } from "../../../helpers/displayHelpers";

type Props = {
  diningOption: DiningEntModelData
};

type LocalState = {

}

export const RestaurantComponent = ({ diningOption } : Props): React.Node => {
  const [ diningCompLocalState, setDiningCompLocalState ] = React.useState({ title: "", description: "", hours: "", imagePaths: [] });
  //
  const { title, description, hours, imagePaths } = diningCompLocalState;
  React.useEffect(() => {
    const { title, description, hours, imagePaths } = setComponentValues(diningOption);
    setDiningCompLocalState({ ...diningCompLocalState, title, description, hours, imagePaths });
  }, []);

  return (
    <Container fluid>
      <Row className={ styles.restaurantCompTitleRow}>
        <div className={ styles.restaurantTitleDiv}>
          <p className={ styles.restaurantTitleContent}>{ title }</p>
        </div>
        <div className={ styles.rowBorder }></div>
      </Row>
      <Row className={ styles.restaurantComponentRow }>
        <Col lg={8} md={12} className={ styles.restaurantComponentPictureCol }>
          <Container fluid className={ styles.leftPicContainer }>
            <Row className={ styles.leftPicUpperRow }>
              
            </Row>
            <Row className={ styles.leftPicLowerRow }>

            </Row>
          </Container>
          <Container fluid className={ styles.rightPicContainer }>
            <Row className={ styles.rightPicRow }>

            </Row>
          </Container>
        </Col>
        
        <Col lg={4} md={12} className={ styles.restaurantComponentDescCol }>
          <div className={ styles.restaurantDescWrapper }>
            <div className={ styles.restaurantDescWrapperLeft }>
              <div className={ styles.restaurantDescriptionDiv }>
                <p>{ description }</p>
              </div>
              <div className={ styles.restaurantHoursDiv}>
                <i className="far fa-clock"></i>
                <span>Open hours:</span>
                <span>{ hours }</span>
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