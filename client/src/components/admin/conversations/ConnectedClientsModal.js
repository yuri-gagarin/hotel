// @flow
import * as React from "react";
import { Button, Card, Icon, Modal } from "semantic-ui-react";
// styles and css //
import styles from "./css/onlineClientsModal.module.css";
// type ///
import type { ConnectedClientData } from "../../../redux/reducers/admin_conversations/flowTypes";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";

type Props = {
  modalOpen: boolean;
  toggleModal: () => void;
  onlineClients: Array<ConnectedClientData>;
};

export const ConnectedClientsModal = ({ modalOpen, toggleModal, onlineClients }: Props): React.Node => {
  const description = "a card description here";

  return (
    modalOpen ? 
    <div className={ styles.usersModalWrapperDiv }> 
      <Modal
        className={ styles.onlineClientsModal }
        open={ true }
        onClose={ toggleModal }
        onOpen={ toggleModal }
      >
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            { onlineClients.length > 0 ?
              <Card.Group itemsPerRow={1}>
              {
                onlineClients.map((onlineClientdata) => {
                  return (
                    <Card key={ onlineClientdata.socketId }>
                      <Card.Content>
                        <Card.Meta>Logged in since: data here</Card.Meta>
                        <Card.Description>
                          Email: { onlineClientdata.email ? onlineClientdata.email : "No email provided" }
                        </Card.Description>
                        <Card.Description>
                          Name: { onlineClientdata.name ? onlineClientdata.name : "No name provided" }
                        </Card.Description>
                      </Card.Content>
                      <Card.Content>
                        <Button content="Message" />
                      </Card.Content>
                    </Card>
                  );
                })
              }            
              </Card.Group>
              : 
              <GeneralNoModelsSegment 
                customHeaderMessage={ "No Online Clients" }
                customContentMessage={ "Any current visitors to your homepage will be show here" }
              />
            }
           
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button 
              color="green"
              onClick={ toggleModal }
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