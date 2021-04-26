// @flow
import * as React from "react";
// bootsrap react //
import { Col, Image, Row, Container, Button } from "react-bootstrap";
// additional components //
import ImageGallery from "react-image-gallery";
import ServiceDetails from "./ServiceDetails";
// FLOW types //
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
import styles from "./css/serviceClientView.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  service: ServiceData,
  triggerImgModal: (imgULRS: Array<string>, imageIndex: number) => void
};

const ServiceClientView = ({ service, triggerImgModal } : Props): React.Node => {
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
      <Row className={ styles.serviceHeaderRow }>
        <div className={ styles.serviceTitle }>  
          {service.serviceType}
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
        <Col className={ `${styles.serviceInfoColumn}` } xs={12} sm={12} lg={8}>
          <ServiceDetails service={service} />
        </Col>
      </Row>
      <Row className={ `${styles.serviceInfoRow}` }>
        <Col xs={12} md={6}>
        </Col>
        <Col xs={12} md={6}>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default ServiceClientView;