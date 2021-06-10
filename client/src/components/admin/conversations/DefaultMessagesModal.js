// @flow
import * as React from "react";
import { Button, Card, Dropdown, Form, Icon, Modal } from "semantic-ui-react";
import ObjectID from "bson-objectid";
// additional components //
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
// types //
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";

// styles and css //
import styles from "./css/defaultMessagesModal.module.css";

type Props = {
  modalOpen: boolean;
  adminConversationState: AdminConversationState;
  toggleDefaultMessagesModal: () => void;
  // CRUD default Message functions //
  handleFetchDefaultMessages: () => Promise<boolean>;
  handleCreateDefaultMessage: (messageData: MessageData) => Promise<boolean>;
  handleUpdateDefaultMessage: (messageData: MessageData, adminConversationState: AdminConversationState) => Promise<boolean>;
  handleDeleteDefaultMessage: (messageId: string, AdminConversationState: AdminConversationState) => Promise<boolean>;
}
type LocalState = {
  formOpen: boolean;
  settingsOpen: boolean;
  messageContent: string;
};
export const DefaultMessagesModal = ({ modalOpen, adminConversationState, toggleDefaultMessagesModal, handleFetchDefaultMessages, handleCreateDefaultMessage, handleUpdateDefaultMessage, handleDeleteDefaultMessage }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formOpen: false, settingsOpen: false, messageContent: "" });
  const { conversationMessageDefaults } = adminConversationState;

  const setFormOpen = (): void => {
    setLocalState({ ...localState, formOpen: !localState.formOpen });
  };
  const toggleSettings = (): void => {
    setLocalState({ ...localState, settingsOpen: !localState.settingsOpen });
  };

  const handleNewDefaultMessageContentChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setLocalState({ ...localState, messageContent: e.currentTarget.value });
  };
  // CRUD redux actions //
  const createNewDefaultMessage = (): void => {
    const newMessageData: MessageData = {
      _id: ObjectID().toHexString(),
      conversationId: "",
      receiverSocketId: "",
      senderSocketId: "",
      sender: "admin",
      messageContent: localState.messageContent,
      sentAt: new Date(Date.now()).toISOString()
    };
    handleCreateDefaultMessage(newMessageData);
  };

  React.useEffect(() => {
    handleFetchDefaultMessages();
  }, []);

  return (
    <Modal className={ styles.modal } open={ true } >
      <Modal.Header className={ styles.modalHeader }>
        Messenger Defaults
        <Button.Group className={ styles.settingsButtons }>
          <Button basic color="green" content="New" onClick={ setFormOpen }/>
          <Button basic color="grey" content={ localState.settingsOpen ? "View Defaults" : "Settings" } onClick={ toggleSettings } />
          <Button basic color="red" onClick={ toggleDefaultMessagesModal }>
            <Icon name="close" color="red" />
          </Button>
        </Button.Group>
      </Modal.Header>
      <Modal.Content scrolling>
        {
          localState.formOpen ?
          <Form className={ styles.newDefaultMessageForm }>
            <Form.Group>
              <Form.TextArea className={ styles.defaultMessageTextArea } onChange={ handleNewDefaultMessageContentChange }>

              </Form.TextArea>
            </Form.Group>
            <Form.Group>
              <Button.Group className={ styles.defaultMessageFormControlButtons }>
                <Button basic color="orange" content="Cancel" />
                <Button basic color="green" content="Save"  onClick={ createNewDefaultMessage }/>
              </Button.Group>
            </Form.Group>
          </Form>
          :
          null
        }
        {
          localState.settingsOpen 
          ?
            <Card.Group>
              <Card fluid>
                <Dropdown />
                <Card.Content>
                  Default 'Welcome' message
                </Card.Content>
                <Card.Content>
                  Something of a content here
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button basic color="orange" content="Reset" />
                    <Button basic color="green" content="Update" />
                  </Button.Group>
                </Card.Content>
              </Card>
              <Card fluid>
                <Dropdown />
                <Card.Content>
                  Default 'Arhived' message
                </Card.Content>
                <Card.Content>
                  Something of a content here
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button basic color="orange" content="Reset" />
                    <Button basic color="green" content="Update" />
                  </Button.Group>
                </Card.Content>
              </Card>
              <Card fluid>
                <Dropdown />
                <Card.Content>
                  Default 'offline' message
                </Card.Content>
                <Card.Content>
                  Something of a content here
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button basic color="orange" content="Reset" />
                    <Button basic color="green" content="Update" />
                  </Button.Group>
                </Card.Content>
              </Card>
            </Card.Group>
          :
            conversationMessageDefaults.length > 0
            ?
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Button color="blue" content="Edit" />
                  <Button color="red" content="Delete" />
                </Card.Content>
              </Card>
            </Card.Group>
            :
            <GeneralNoModelsSegment 
              customHeaderMessage={ "No Defaults Set" } 
              customContentMessage={ "Create default messages for automated response by clicking 'New' button" }
            />
        }
      </Modal.Content>
    </Modal>
  );
};