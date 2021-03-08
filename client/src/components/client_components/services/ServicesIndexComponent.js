import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
// additonal components //
import NavbarComponent from "../navbar/NavbarComponent";
import Carousel, { Modal, ModalGateway } from "react-images";
import ClipText from "../../admin/shared/ClipText";
// react bootstrap component imports //
import {
  Container, Row, Col
} from "react-bootstrap";
import styles from "./css/servicesIndexContainer.module.css";
// helpers //
import { navbarCollapseListener } from "../../helpers/componentHelpers";

const imgOverlay = {
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "100%",
  height: "200px",
  backgroundColor: "rg",
  opacity: "0.25",
  transition: "opacity 1s ease-out"
}

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3
  }
];


const ServicesIndexComponent = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  useEffect(() => {
    navbarCollapseListener();
  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
 
  return (
    <div className={ styles.mainContainer }>
      <NavbarComponent />
      <Row>
        <div className={ styles.servicesHeader }>
          <div className={ styles.headerText}>
            <ClipText text={"Services"} />
          </div>
        </div>
      </Row>
      <Row className={ styles.serviceRow }>
        <Container className={ `${styles.serviceContainer} ${styles.draw}` }>
          <Gallery photos={photos.slice(0, 6)} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map(x => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
          
        </Container>
        
      </Row>
      <div className={ styles.servicesBreakpoint }>
      </div>
    </div>
  )
};  

export default ServicesIndexComponent;