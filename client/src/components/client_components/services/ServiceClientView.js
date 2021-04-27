// @flow
import * as React from "react";
// bootsrap react //
import { Col, Image, Row, Container, Button } from "react-bootstrap";
// additional components //
import { AnimatedBorder } from "../shared/AnimatedBorder";
// FLOW types //
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
import styles from "./css/serviceClientView.module.css";
// helpers //
import { setImagePath, setStringTranslation } from "../../helpers/displayHelpers";

type Props = {
  service: ServiceData,
  triggerImgModal: (imgULRS: Array<string>, imageIndex: number) => void
};

const ServiceClientView = ({ service, triggerImgModal } : Props): React.Node => {
  const { serviceType, price, hours, description } = service;
  const [ imgURLS, setImgURLS ] = React.useState<Array<string>>([]);
  
  React.useEffect(() => {
    const urls: Array<string> = [];
    for (let i = 0; i < 3; i++) {
      if (service.images[i]) {
        urls.push(setImagePath(service.images[i].path));
      } else {
        urls.push(setImagePath());
      }
    }
    setImgURLS(urls);
  }, [ service ]);

  const handleServiceInfoClick = () => {
    console.log("clicked")
  }

  return (
    <React.Fragment>
      <AnimatedBorder animationDelay={ 500 } />
      <Container className={ styles.serviceViewContainer }>
        <Row className={ styles.serviceTitleRow }>
          <div className={ styles.serviceTitle }>  
            { serviceType ? serviceType : "Service type here..." }
          </div>
        </Row>
        <Row className={ styles.servicesPicRow }>
          <Col className={ styles.servicesPicCol } xs={12} md={3}>
            <div className={ styles.serviceImgDiv } onClick={() => triggerImgModal(imgURLS, 0)}>
              <Image className={ styles.serviceImg } src={ imgURLS[0] }></Image>
            </div>
          </Col>
          <Col className={ styles.servicesPicCol }  xs={12} md={3}>
            <div className={ styles.serviceImgDiv } onClick={() => triggerImgModal(imgURLS, 1)}>
              <Image className={ styles.serviceImg } src={ imgURLS[1] }></Image>
            </div>
          </Col>
          <Col className={ styles.servicesPicCol }  xs={12} md={3}>
            <div className={ styles.serviceImgDiv } onClick={() => triggerImgModal(imgURLS, 2)}>
              <Image className={ styles.serviceImg } src={ imgURLS[2] }></Image>
            </div>
          </Col>
        </Row>
        <Row className={ `${styles.serviceInfoRow}` }>
          <Col className={ `${styles.serviceInfoColumn}` } xs={12} sm={12} lg={12}>
            <div className={ styles.hoursDiv }>
              <span>Hours</span>
              <i className="far fa-clock"></i>
              <span>{ hours ? hours : "No hours provided..." }</span>
            </div>
            {
              price ? <div className={ styles.priceDiv }>{ price }</div>  : null
            }
            <div className={ styles.descDiv }>
              <p>{ description ? setStringTranslation(description, "en") : "No description..."}</p>
            </div>
          </Col>
        </Row>
      </Container>
      <AnimatedBorder animationDelay={ 500 } />
    </React.Fragment>
  )
};

export default ServiceClientView;