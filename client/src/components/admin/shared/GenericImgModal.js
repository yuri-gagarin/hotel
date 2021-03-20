// @flow
import * as React from "react";
// semantic ui react imports //
import { Modal, Image } from "semantic-ui-react";
// styles //
import styles from "./css/genericImgModal.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";
 
type Props = {
  open: boolean,
  imgURL: string,
  handleClose: () => void
}
const GenericImgModal = ({ open, imgURL, handleClose } : Props): React.Node => {


  return (
    <Modal
      style={{ position: "relative", textAlign: "center" }}
      className={ styles.genericImgModal }
      basic
      closeIcon
      closeOnDimmerClick
      onClose={ () => handleClose() }
      open={open}
    >
      <Image size="huge" rounded src={ imgURL } />
    </Modal>
  );
};

export default GenericImgModal;