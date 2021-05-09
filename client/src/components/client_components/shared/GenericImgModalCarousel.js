// @flow
import * as React from "react";
// ui bootstrap imports //
import { Button, Modal, Carousel } from "react-bootstrap";
// styles and css //
import styles from "./css/genericImgModal.module.css";
// helper functions //
import { setImagePath } from "./../../helpers/displayHelpers";


type Props = {
  show: boolean,
  imgURLS: Array<string>,
  imageIndex: number,
  closePictureModal: () => any
}
const GenericImgModalCarousel = ({ show, imgURLS, imageIndex, closePictureModal } : Props): React.Node => {
  const [ index, setIndex ] = React.useState(imageIndex);
  // const [direction, setDirection] = useState(null);
  
  React.useEffect(() => {
    if (show && typeof imageIndex === "number") setIndex(imageIndex);
  }, [ show ]);
  
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Modal show={show} className={ styles.pictureModal } onHide={ closePictureModal }>
      <Modal.Dialog className={ styles.modalDialog }>
      <div className={ styles.pictureDialog }>
        <Carousel fade activeIndex={ index } onSelect={ handleSelect } className={ styles.imgCarousel } >
          {
            imgURLS.map((imgURL) => {
              return (
                <Carousel.Item key={imgURL} className={ styles.carouselItem }>
                  <img
                    className={ `${styles.roomPopupModalImg }` } 
                    src={ imgURL }
                    alt="First slide"
                  />
                </Carousel.Item>
              )
            })
          }
        </Carousel>
        <div className={ styles.closeModalToggle }>
          <i className={ `fas fa-times` } onClick={ closePictureModal }></i>
        </div>
      </div>
      </Modal.Dialog>
      
    </Modal>
  );
};

export default GenericImgModalCarousel;
        