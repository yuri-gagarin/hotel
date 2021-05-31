// @flow
import * as React from "react";
import { Button, Card, Feed, Form, Icon, Modal } from "semantic-ui-react";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
// styles and css //
import styles from "./css/messageAllModal.module.css";
// type ///
import type { ConnectedClientData } from "../../../redux/reducers/admin_conversations/flowTypes";

type Props = {
  modalOpen: boolean;
  toggleModal: () => void;
  handleSendGroupMessage: () => void;
  onlineClients: Array<ConnectedClientData>;
};

export const MessageAllModal = ({ modalOpen, toggleModal, handleSendGroupMessage, onlineClients }: Props): React.Node => {
  const description = "a card description here";

  return (
    modalOpen ? 
    <div className={ styles.messageAllModalDiv }> 
      <Modal
        className={ styles.messageAllModal }
        open={ true }
        onClose={ toggleModal }
        onOpen={ toggleModal }
      >
        <Modal.Header>Group message form</Modal.Header>
        <Modal.Content scrolling style={{ padding: 0 }}>
          <Modal.Description>
            { onlineClients.length > 0 ?
                <Form>
                  <Form.TextArea className={ styles.messageInputArea }>

                  </Form.TextArea>
                </Form>
              :
                <GeneralNoModelsSegment customHeaderMessage="No online clients" customContentMessage={ "There aren't any currently online client to message"} />
            }
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button 
              color="green"
              onClick={ toggleModal }
              disabled={ onlineClients.length === 0 ? true : false }
            >
              <Icon name="comment" /> Message All
            </Button>
            <Button 
              color="orange"
              onClick={ toggleModal }
            >
              <Icon name="cancel" /> Close
            </Button>
          </Button.Group>
         
        </Modal.Actions>
      </Modal>
    </div>
    : 
    null
  );
}; 