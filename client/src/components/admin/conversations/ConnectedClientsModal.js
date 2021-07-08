// @flow
import * as React from "react";
import { Button, Card, Feed, Icon, Modal } from "semantic-ui-react";
// styles and css //
import styles from "./css/onlineClientsModal.module.css";
// type ///
import type { ConnectedClientData } from "../../../redux/reducers/admin_conversations/flowTypes";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";

type Props = {
  modalOpen: boolean;
  toggleModal: () => void;
  handleToggleConversation: (socketId: string) => void;
  messengerOnline: boolean;
  onlineClients: Array<ConnectedClientData>;
  activeConversationIds: Array<string>;
};

export const ConnectedClientsModal = ({ modalOpen, toggleModal, handleToggleConversation, messengerOnline, onlineClients, activeConversationIds }: Props): React.Node => {
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
        <Modal.Header>Currently online clients</Modal.Header>
        <Modal.Content scrolling style={{ padding: 0 }}>
          <Modal.Description>
            { messengerOnline 
              ?
              ( onlineClients.length > 0 ?
              <Card.Group itemsPerRow={1} style={{ padding: 0 }}>
                <Card>
                  <Card.Content>
                    <Feed>
                    {
                      onlineClients.map((onlineClientdata) => {
                        return (
                          <Feed.Event key={ onlineClientdata.socketId }>
                            <Feed.Label>
                              <Icon name="user circle outline" />
                            </Feed.Label>
                            <Feed.Content>
                              <Feed.Summary>
                                <Feed.User>{ onlineClientdata.name }</Feed.User> entered your site
                                <Feed.Date>Date here</Feed.Date>
                              </Feed.Summary>
                            </Feed.Content>
                            <Feed.Extra>
                              <Button 
                                basic color="blue" onClick={ () => handleToggleConversation(onlineClientdata.socketId) } 
                                content={ activeConversationIds.includes(`CONVERSATION_${onlineClientdata.socketId}`) ? "Open Conversation" : "New Conversation" }
                                icon="comment" 
                              />
                            </Feed.Extra>

                          </Feed.Event>
                        );
                      })
                    }  
                    </Feed>
                  </Card.Content>   
                </Card>       
              </Card.Group>
              : 
              <GeneralNoModelsSegment 
                customHeaderMessage={ "No Online Clients" }
                customContentMessage={ "Any current visitors to your homepage will be show here" }
              />
              )
              :
              <GeneralNoModelsSegment 
                customHeaderMessage={ "Messenger not Online"}
                customContentMessage={ "Take instant messenger online to see any currently connected clients" }
              />
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