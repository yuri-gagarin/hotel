// @flow
import * as React from "react";
// ui bootstrap imports //
import { Button, Image  } from "react-bootstrap";
import { Modal } from "semantic-ui-react";
import Slider from "react-slick";
// styles and css //
import styles from "./css/genericImgModal.module.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// helper functions //
import { setImagePath } from "./../../helpers/displayHelpers";


type Props = {
  show: boolean,
  imgURLS: Array<string>,
  imageIndex: number,
  closePictureModal: () => any
}
const GenericImgModalCarousel = ({ show, imgURLS, imageIndex, closePictureModal }: Props): React.Node => {
  const [ index, setIndex ] = React.useState(imageIndex);
  // const [direction, setDirection] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: imageIndex
  };

  React.useEffect(() => {
    if (show && typeof imageIndex === "number") setIndex(imageIndex);
  }, [ show ]);
  /*
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
  */

  return (
    <Modal open={ show } onClose={ closePictureModal } className={ styles.pictureModal } size="fullscreen">
      <Slider { ...settings } className={ styles.carouselSlider } >
        {
          imgURLS.map((url, i) => {
            return (
              <div className={ styles.sliderContent } key={ String(url + i) }>
                <img className={ styles.sliderImg } src={ url }></img>
              </div>
            )
          })
        }
      </Slider>
      <div className={ styles.closeModalToggle }>
        <i className={ `fas fa-times` } onClick={ closePictureModal }></i>
      </div>      
    </Modal>
  );
};

export default GenericImgModalCarousel;
        