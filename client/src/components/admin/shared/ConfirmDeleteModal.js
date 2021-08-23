// @flow
import * as React from "react";
import { Button, Content, Header, Icon, Modal } from "semantic-ui-react";
// styles and css//
import styles from "./css/confirmDeleteModal.module.css";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

type Props = {
  open: boolean,
  modelName: "room" | "service" | "dining" | "extra" | "image" | "contact" | "conversation" | "message" | "newsPost" | "",
  confirmAction: () => Promise<void | boolean>,
  cancelAction: () => void,
  customHeader?: string,
  customContent?: string
}

export const ConfirmDeleteModal = ({ open, modelName, customHeader, customContent, confirmAction, cancelAction }: Props): React.Node => {
 
  return (
    <Modal className={ styles.confirmDelModal } size="tiny" open={ open }>
      <Header icon="warning circle" content="Confirm Delete Action"  color="red" />
        <Modal.Content>
          <span className={ styles.textContent }>
            {
              customContent 
              ? customContent
              : `This will delete the selected ${ modelName ? capitalizeString(modelName) : "Model"} data all of its additional images if any. This action is permanent`
            }
          </span>
        </Modal.Content>
        <Modal.Actions className={ styles.actionsContainer }>
          <Button color="grey" onClick={ cancelAction } >
            <Icon name="cancel" />
            Cancel
          </Button>
          <Button color="red" onClick={ confirmAction } >
            <Icon name="trash alternate outline" />
            Confirm Delete
          </Button>
        </Modal.Actions>
    </Modal>
  );
};

export default ConfirmDeleteModal;