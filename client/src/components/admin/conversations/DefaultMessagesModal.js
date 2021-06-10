// @flow
import * as React from "react";
import { Button, Card, Dropdown, Form, Icon, Input, Modal, TextArea } from "semantic-ui-react";
import ObjectID from "bson-objectid";
// additional components //
import { DefaultMessageMenu } from "./DefaultMessageMenu";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
// types //
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// helpers //
import { formatDate } from "../../helpers/dateHelpers";

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
  // defai
}
type LocalState = {
  formOpen: boolean;
  settingsOpen: boolean;
  messageDescription: string;
  messageContent: string;
  messageDescriptionError: string;
  messageContentError: string;
};
type DropdownOptions = {
  key: string;
  text: string;
  value: string;
};
type DefaultsState = {

}

export const DefaultMessagesModal = ({ modalOpen, adminConversationState, toggleDefaultMessagesModal, handleFetchDefaultMessages, handleCreateDefaultMessage, handleUpdateDefaultMessage, handleDeleteDefaultMessage }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formOpen: false, settingsOpen: false, messageDescription: "", messageContent: "", messageDescriptionError: "", messageContentError: "" });
  const [ dropdownState, setDropdownState ] = React.useState<Array<DropdownOptions>>([]);
  //
  const { conversationMessageDefaults } = adminConversationState;

  const setFormOpen = (): void => {
    setLocalState({ ...localState, formOpen: !localState.formOpen });
  };
  const toggleSettings = (): void => {
    setLocalState({ ...localState, formOpen: false, settingsOpen: !localState.settingsOpen });
  };

  const handleNewDefaultMessageDescriptionChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) {
      setLocalState({ ...localState, messageDescription: e.currentTarget.value, messageDescriptionError: "Provide a short description to differentiate between messages"});
    } else {
      setLocalState({ ...localState, messageDescription: e.currentTarget.value, messageDescriptionError: "" });
    }
  }
  const handleNewDefaultMessageContentChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length === 0) {
      setLocalState({ ...localState, messageContent: e.currentTarget.value, messageContentError: "Please type the default message content to display" });
    } else {
      setLocalState({ ...localState, messageContent: e.currentTarget.value, messageContentError: "" });
    }
  };
  // CRUD redux actions //
  const createNewDefaultMessage = (): void => {
    if (!localState.messageDescription || !localState.messageContent) return;

    const newMessageData: MessageData = {
      _id: ObjectID().toHexString(),
      messageDescription: localState.messageDescription,
      conversationId: "",
      receiverSocketId: "",
      senderSocketId: "",
      sender: "admin",
      messageContent: localState.messageContent,
      sentAt: new Date(Date.now()).toISOString()
    };
    handleCreateDefaultMessage(newMessageData)
      .then((success) => {
        if (success) setLocalState({ ...localState, formOpen: false, messageContent: "" });
      });
  };
  const updatedDefaultMessage = (): void => {
    if (!localState.messageDescription || !localState.messageContent) return;

  };

  const handleDropdownChange = (e: any, data: any): void => {
    console.log(data.value);
  };

  // messaging defaults value setter //
  const handleSetDefaultMessage = (messageData: MessageData): void => {
    handleUpdateDefaultMessage(messageData, adminConversationState);
  };

  React.useEffect(() => {
    handleFetchDefaultMessages();
  }, []);
  React.useEffect(() => {
    if (conversationMessageDefaults.length > 0) {
      const dropDownOptions: Array<DropdownOptions> = conversationMessageDefaults.map((messageData) => {
        return { key: messageData._id, text: messageData.messageDescription ? messageData.messageDescription : "No value", value: messageData._id }
      });
      setDropdownState(dropDownOptions);
    }
  }, [ conversationMessageDefaults ]);

  return (
    <Modal className={ styles.modal } open={ modalOpen } >
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
            <Form.Field
              control={Input}
              label='Message Description'
              placeholder='a short description to separate from other defaults'
              onChange={ handleNewDefaultMessageDescriptionChange }
              error={ localState.messageDescriptionError ? { content: localState.messageDescriptionError } : null }
            />
            <Form.Field 
              className={ styles.defaultMessageTextArea } 
              onChange={ handleNewDefaultMessageContentChange }
              control={TextArea}
              label="Message Content"
              placeholder="the content of the message which you want to be automatically sent"
            />
            <Button.Group className={ styles.defaultMessageFormControlButtons }>
              <Button basic color="orange" content="Cancel" onClick={ setFormOpen } />
              <Button basic color="green" content="Save"  onClick={ createNewDefaultMessage }/>
            </Button.Group>
          </Form>
          :
          null
        }
        {
          localState.settingsOpen 
          ?
            <Card.Group>
              <Card fluid color="green">
                <Dropdown selection clearable placeholder="ok" options={ dropdownState } onChange={ handleDropdownChange } />
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
            { 
              conversationMessageDefaults.map((messageData) => {
                return (
                  <Card fluid key={ messageData._id } color="green">
                    <Card.Content>
                      <DefaultMessageMenu 
                        messageData={ messageData }
                        handleSetDefaultMessage={ handleSetDefaultMessage }
                      />
                    </Card.Content>
                    <Card.Content className={ styles.messageCardContent }>
                      <span>Message content: </span>
                      <div>{messageData.messageContent}</div>
                    </Card.Content>
                    <Card.Content className={ styles.messageCardDate }>
                      <span>Created at:</span>
                      <span>{formatDate(messageData.sentAt, { military: false })}</span>
                    </Card.Content>
                  </Card>
                )
              })
            }
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