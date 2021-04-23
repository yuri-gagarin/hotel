// @flow
import * as React from "react";
import PropTypes from "prop-types";
// ui bootstrap imports //
import { Button, Modal, Image, Carousel } from "react-bootstrap";
// styles and css //
import styles from "./css/roomImgModal.module.css";
// helper functions //
import { setImagePath } from "./../../helpers/displayHelpers";


type Props = {
  show: boolean,
  imgURLS: Array<string>,
  imageIndex: number,
  closePictureModal: () => any
}
const RoomImgModal = ({ show, imgURLS, imageIndex, closePictureModal } : Props): React.Node => {
  const [ index, setIndex ] = React.useState(imageIndex);
  // const [direction, setDirection] = useState(null);
  
  React.useEffect(() => {
    if (show && imageIndex) setIndex(imageIndex);
  }, [ show ]);
  
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Modal show={show} className={ styles.pictureModal } onHide={ closePictureModal }>
      <div className={ styles.pictureDialog }>
        <Carousel fade activeIndex={ index } onSelect={ handleSelect } className={ styles.imgCarousel } >
          {
            imgURLS.map((imgURL) => {
              return (
                <Carousel.Item key={imgURL}>
                  <Image
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
    </Modal>
  );
};

export default RoomImgModal;
        