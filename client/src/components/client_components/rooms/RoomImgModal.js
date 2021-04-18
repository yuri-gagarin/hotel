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
  //const [index, setIndex] = useState(imageIndex);
  // const [direction, setDirection] = useState(null);
  
  // set the initial image to one clicked on //
  /*
  useEffect(() => {
    if (paths.length )
    setIndex(imageIndex.index);
  }, [show]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    // setDirection(e.direction);
  };
  */
 const handleSelect = () => {

 }

 React.useEffect(() => {
  console.log(imageIndex)
 }, [ imageIndex ]);



  return (
    <Modal show={show} className={ styles.pictureModal } onHide={ closePictureModal }>
      <div className={ styles.pictureDialog }>
        <Carousel activeIndex={ 0 } onSelect={ handleSelect } className={ styles.imgCarousel } >
          {
            imgURLS.map((imgURL, i) => {
              return (
                <Carousel.Item key={i}>
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
      </div>
    </Modal>
  );
};

export default RoomImgModal;

/*
<Carousel activeIndex={ 0 } onSelect={ handleSelect } className={ styles.imgCarousel } >
  {
    imgURLS.map((imgURL, i) => {
      console.log(imgURL);
      return (
        <Carousel.Item key={i}>
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
*/
        