// @flow
import * as React from "react";
import { Button, Card, Dropdown, Form, Icon, Input, Modal, TextArea } from "semantic-ui-react";
import ObjectID from "bson-objectid";
// additional components //
import { ConfiguredDefaultCard } from "./ConfiguredDefaultCard";
import { DefaultMessageCard } from "./DefaultMessageCard";
import { DefaultMessageMenu } from "./DefaultMessageMenu";
import { GeneralNoModelsSegment } from "../../shared/GeneralNoModelsSegment";
// types //
import type { AdminConversationState } from "../../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../../redux/reducers/conversations/flowTypes";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";
import { setStringTranslation } from "../../../helpers/displayHelpers";
import { generateEmptyMessageModel } from "../../../../redux/reducers/_helpers/emptyDataGenerators";
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
  messagesOpen: boolean;
  messageDescription: string;
  messageContent: string;
  messageDescriptionError: string;
  messageContentError: string;
};
type DefaultsState = {|
  defaultGreetingMessage: { _id: string, messageContent: string };
  defaultOfflineMessage: { _id: string, messageContent: string };
  defaultResolvedMessage: { _id: string, messageContent: string };
|};

export const DefaultMessagesModal = ({ modalOpen, adminConversationState, toggleDefaultMessagesModal, handleFetchDefaultMessages, handleCreateDefaultMessage, handleUpdateDefaultMessage, triggerMessageModelDelete }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formOpen: false, messagesOpen: false, messageDescription: "", messageContent: "", messageDescriptionError: "", messageContentError: "" });
  const [ defaultsState, setDefaultsState ] = React.useState<DefaultsState>({ defaultGreetingMessage: generateEmptyMessageModel(), defaultOfflineMessage: generateEmptyMessageModel(), defaultResolvedMessage: generateEmptyMessageModel() });
  //
  const { conversationMessageDefaults } = adminConversationState;

  const setFormOpen = (): void => {
    setLocalState({ ...localState, messagesOpen: true, formOpen: !localState.formOpen });
  };
  const toggleAllMessages = (): void => {
    setLocalState({ ...localState, formOpen: false, messagesOpen: !localState.messagesOpen });
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

  const setDefaultMessageLanguage = (messageContentLanguage: ("en" | "uk" | "ru")): void => {
    setLocalState({ ...localState, messageContentLanguage });
  };

  const handleClearDefaultMessage = (messageId: string): void => {
    if (!messageId) return;

    const defaultMessageToUpdate: MessageData = adminConversationState.conversationMessageDefaults
      .filter((messageData) => messageData._id === messageId)
      .map(messageData => ({ ...messageData, messageType: null }))[0];
    if (!defaultMessageToUpdate) return;

    handleUpdateDefaultMessage(defaultMessageToUpdate, adminConversationState);
    //const messageToUpdate = adminConversationState.conversationMessageDefaults.filter((messageData) => messageData._id === messageId)[0];
    //if (messageToUpdate) handleUpdateDefaultMessage({ ...messageToUpdate, messageType: null }, adminConversationState);
  };

  React.useEffect(() => {
    handleFetchDefaultMessages();
  }, []);

  React.useEffect(() => {
    const { conversationMessageDefaults } = adminConversationState;
    const defaultsState: DefaultsState = {
      defaultGreetingMessage: { _id: "", messageContent: "No default greeting message set. Create one by clicking 'New' button above..." },
      defaultOfflineMessage: { _id: "", messageContent: "No default offline message set. Create one by clikcing 'New' button above..." },
      defaultResolvedMessage: { _id: "", messageContent: "No default resolved message set. Craete one by clicking 'New' button above...." } 
    }
    if (conversationMessageDefaults.length > 0) {
      for (const messageData of conversationMessageDefaults) {
        if (messageData.messageType && messageData.messageType === "DefaultGreeting") {
          defaultsState.defaultGreetingMessage = { _id: messageData._id, messageContent: messageData.messageContent };
        } else if (messageData.messageType && messageData.messageType === "DefaultOffline") {
          defaultsState.defaultOfflineMessage = { _id: messageData._id, messageContent: messageData.messageContent };
        } else if (messageData.messageType && messageData.messageType === "DefaultResolved") {
          defaultsState.defaultResolvedMessage = { _id: messageData._id, messageContent: messageData.messageContent };
        } else {
          continue;
        }
      }
      setDefaultsState(defaultsState);
    }
  }, [ adminConversationState.conversationMessageDefaults ]);

  return (
    <Modal className={ styles.modal } open={ modalOpen } >
      <Modal.Content>
        <div className={ styles.modalHeaderDiv }>
          <div className={ styles.modalHeaderTitle }><span>Client Messenger</span><span> default responses settings:</span></div>
          <div>
          <Button.Group attached="right" className={ styles.settingsButtons }>
            <Button basic color="green" onClick={ setFormOpen }>
              Create New
              <Icon style={{ marginLeft: "5px" }} name="file" />
            </Button>
            <Button basic color="grey"  onClick={ toggleAllMessages }>
              {localState.messagesOpen ? "View Set Defaults" : "View All Default Messages"}
              <Icon style={{ marginLeft: "5px" }} name="settings" />
            </Button>
            <Button basic color="grey" onClick={ handleFetchDefaultMessages } >
              Reload All
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
          localState.messagesOpen
          ?
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
          :
          <React.Fragment>
             <ConfiguredDefaultCard 
              key="online"
              messageHeaderLabel="Online"
              handleClearDefaultMessage={ handleClearDefaultMessage }
              messageId={ defaultsState.defaultGreetingMessage._id }
              messageContent={ defaultsState.defaultGreetingMessage.messageContent }
              setDefaultMessageLanguage={ setDefaultMessageLanguage }
            />
            <ConfiguredDefaultCard
              key="offline"
              messageHeaderLabel={"Offline"}
              handleClearDefaultMessage={ handleClearDefaultMessage }
              messageId={ defaultsState.defaultOfflineMessage._id }
              messageContent={ defaultsState.defaultOfflineMessage.messageContent }
              setDefaultMessageLanguage={ setDefaultMessageLanguage }
            />
            <ConfiguredDefaultCard
              key="resolved"
              messageHeaderLabel={"Resolved"}
              handleClearDefaultMessage={ handleClearDefaultMessage }
              messageId={ defaultsState.defaultResolvedMessage._id }
              messageContent={ defaultsState.defaultResolvedMessage.messageContent }
              setDefaultMessageLanguage={ setDefaultMessageLanguage }
            />
          </React.Fragment>
        }
      </Modal.Content>
    </Modal>
  );
};