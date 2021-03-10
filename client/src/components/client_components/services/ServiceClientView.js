import React,  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageGallery from "react-image-gallery";
// 
import { Col, Row, Container, Button } from "react-bootstrap";
// 
import ServiceDetails from "./ServiceDetails";
//
import styles from "./css/serviceClientView.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const defaultImages = [
  {
    original: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    thumbnail: "https://source.unsplash.com/2ShvY8Lf6l0/800x599"

  },
  {
    original: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    thumbnail:  "https://source.unsplash.com/Dm-qxdynoEc/800x799"
  },
  {
    original: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    thumbnail: "https://source.unsplash.com/qDkso9nvCg0/600x799"
  },
  {
    original: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    thumbnail: "https://source.unsplash.com/iecJiKe_RNg/600x799"
  },
  {
    original: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    thumbnail: "https://source.unsplash.com/epcsn8Ed8kY/600x799"
  },
  {
    original: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    thumbnail: "https://source.unsplash.com/NQSWvyVRIJk/800x599"
  },
  {
    original: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    thumbnail: "https://source.unsplash.com/zh7GEuORbUw/600x799"
  },
  {
    original: "https://source.unsplash.com/PpOHJezOalU/800x599",
    thumbnail: "https://source.unsplash.com/PpOHJezOalU/800x599"
  },
  {
    original: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    thumbnail: "https://source.unsplash.com/I1ASdgphUH4/800x599"
  }
];

const ServiceClientView = ({ service }) => {
  const [ serviceImages, setServiceImages ] = useState([]);

  useEffect(() => {
    
    if (service.images && service.images.length > 0) {
      const images = service.images.map((image) => {
        return {
          original: setImagePath(image.path),
          thumbnail: setImagePath(image.path),
          originalClass: styles.galleryImage,
          thumbnailClass: styles.thumbnailImage
        }
      })
      setServiceImages(images);
    } else {
      // use default images //
      const images = defaultImages.map((image) => {
        return {
          ...image,
          originalClass: styles.galleryImage,
          thumbnailClass: styles.thumbnailImage
        }
      })
      setServiceImages(images);
    }
    
  },  []);

  const handleServiceInfoClick = () => {
    console.log("clicked")
  }

  return (
    <Row className={ styles.serviceRow } key={ service._id }>
      <div className={ styles.serviceTitle }>  
        { "Something" }
      </div>
      <Col xs={12} sm={12} lg={6} style={{ padding: "0" }}>
        <Container fluid className={ `${styles.serviceContainer} ${styles.draw}` }>
          <ImageGallery 
            showNav={ false }
            autoplay={ true }
            additionalClass={ styles.serviceImgGallery }
            showThumbnails={ false }
            items={ serviceImages }
          />
          
        </Container>
      
      </Col>
      <div className={ styles.serviceDetailsBtnDiv }>
        <Button  variant="light" onClick={ handleServiceInfoClick }>{ "Get Details"}</Button>
      </div>
      <Col xs={12} sm={12} lg={6} style={{ padding: "0" }}>
      <ServiceDetails service={service} />
      </Col>
  
    </Row>
  )
};

ServiceClientView.propTypes = {
  service: PropTypes.object.isRequired
};

export default ServiceClientView;