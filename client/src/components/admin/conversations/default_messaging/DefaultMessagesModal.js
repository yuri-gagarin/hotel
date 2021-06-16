// @flow
import * as React from "react";
import { Button, Card, Dropdown, Form, Icon, Input, Modal, TextArea } from "semantic-ui-react";
import ObjectID from "bson-objectid";
// additional components //
import { DefaultMessageCard } from "./DefaultMessageCard";
import { DefaultMessageMenu } from "./DefaultMessageMenu";
import { GeneralNoModelsSegment } from "../../shared/GeneralNoModelsSegment";
// types //
import type { AdminConversationState } from "../../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../../redux/reducers/conversations/flowTypes";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";

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
  // defai
  triggerMessageModelDelete: (messageId: string) => void;
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

export const DefaultMessagesModal = ({ modalOpen, adminConversationState, toggleDefaultMessagesModal, handleFetchDefaultMessages, handleCreateDefaultMessage, handleUpdateDefaultMessage, triggerMessageModelDelete }: Props): React.Node => {
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
    if (localState.messageDescriptionError || localState.messageContentError || !localState.messageDescription || !localState.messageContent) return;

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
  const updateMessage = (messageData: MessageData): Promise<boolean> => {
    return handleUpdateDefaultMessage(messageData, adminConversationState);
  };

  // message defaults value getters //
  const getDefaultWelcomeMessage = (): string => {
    const defaultWelcomeMessage: MessageData = adminConversationState.conversationMessageDefaults.filter((data) => data.messageType === "DefaultGreeting")[0];
    if (defaultWelcomeMessage) { 
      return defaultWelcomeMessage.messageContent;
    } else {
      return "No default welcome message set yet...";
    }
  };
  const getDefaultResolvedMessage = (): string => {
    const defaultResolvedMessage: MessageData = adminConversationState.conversationMessageDefaults.filter((data) => data.messageType === "DefaultResolved")[0];
    if (defaultResolvedMessage) {
      return defaultResolvedMessage.messageContent;
    } else {
      return "No default conversation resolved message set yet...";
    }
  };
  const getDefaultOfflineMessage = (): string => {
    const defaultOfflineMessage: MessageData = adminConversationState.conversationMessageDefaults.filter((data) => data.messageType === "DefaultOffline")[0];
    if (defaultOfflineMessage) {
      return defaultOfflineMessage.messageContent;
    } else {
      return "No default messenger offline message set yet...";
    }
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
    <Modal className={ styles.modal } open={ true } >
      <Modal.Content>
        <div className={ styles.modalHeaderDiv }>
          <div>Messenger default responses settings:</div>
          <div>
          <Button.Group className={ styles.settingsButtons }>
            <Button basic color="green" onClick={ setFormOpen }>
              New
              <Icon style={{ marginLeft: "5px" }} name="file" />
            </Button>
            <Button basic color="grey"  onClick={ toggleSettings }>
              {localState.settingsOpen ? "View All Messages" : "View Set Defaults"}
              <Icon style={{ marginLeft: "5px" }} name="settings" />
            </Button>
            <Button basic color="grey" onClick={ handleFetchDefaultMessages } >
              Reload
              <Icon style={{ marginLeft: "5px" }} name="refresh" />
            </Button>
            <Button basic color="red" onClick={ toggleDefaultMessagesModal }>
              <Icon style={{ margin: "0 auto" }}name="close" color="red" />
            </Button>
          </Button.Group>
          </div>
        </div>
      </Modal.Content>
      <Modal.Content scrolling style={{ height: "calc(90vh - 60px)", maxHeight: "none" }}>
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
              error={ localState.messageContentError ? { content: localState.messageContentError } : null }
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
              <Card fluid>
                <Card.Header className={ styles.setDefaultsCardHeader}>
                  <span>Default <span>'Welcome'</span>  message</span> 
                </Card.Header>
                <Card.Meta style={{ paddingLeft: "14px", paddingRight: "14px" }}> 
                  This is the message which is automaticaly sent when client initially enters your site:
                </Card.Meta>
                <Card.Content>
                  {getDefaultWelcomeMessage()}
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button basic color="orange" content="Clear" />
                  </Button.Group>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Header className={ styles.setDefaultsCardHeader}>
                  <span>Default <span>'Resolved'</span>  message</span> 
                </Card.Header>
                <Card.Meta style={{ paddingLeft: "14px", paddingRight: "14px" }}> 
                  This is the message which is automatically sent when you archive a conversation:
                </Card.Meta>
                <Card.Content>
                  {getDefaultResolvedMessage()}
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button basic color="orange" content="Clear" />
                  </Button.Group>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Header className={ styles.setDefaultsCardHeader}>
                  <span>Default <span>'Offline'</span>  message</span> 
                </Card.Header>
                <Card.Meta style={{ paddingLeft: "14px", paddingRight: "14px" }}> 
                  This is the message which is automatically sent when a client sends a message and there are no admins online:
                </Card.Meta>
                <Card.Content>
                  {getDefaultOfflineMessage()}
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button basic color="orange" content="Clear" />
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
                  <DefaultMessageCard 
                    key={ messageData._id }
                    messageData={ messageData }
                    updateMessage={ updateMessage }
                    triggerMessageModelDelete={ triggerMessageModelDelete }
                  />
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