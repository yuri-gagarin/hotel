// @flow
import * as React from "react";
import { Comment, Grid, Input, Segment } from "semantic-ui-react";
import ObjectID from "bson-objectid";
// additional component imports //
import Message from "./Message";
// style imports //
import styles from "./css/messagesView.module.css";
// types //
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
type Props = {
  adminState: any;
  adminConversationState: AdminConversationState;
  sendAdminMessage: (messageData: MessageData, adminConversationState: AdminConversationState) => Promise<boolean>;
  closeConversation: () => void;
}
const MessagesView = ({ adminState, adminConversationState, sendAdminMessage, closeConversation }: Props): React.Node => {
  const { activeConversation, loadedAdminConversations } = adminConversationState;
  const [ message, setMessage ] = React.useState("");
  const [ messageSounds, setMessageSounds ] = React.useState({});
  // set the sound effects for send, receive instant message //
  React.useEffect(() => { 
    // load sounds upon component load //
    const messageInput = document.getElementById("messageInput");
    setMessageSounds({
      ...messageSounds,
      sendMessageSound: new Audio("/assets/media/sounds/sentMsg.mp3"),
      receiveMessageSound: new Audio("/assets/media/sounds/receiveMsg.mp3")
    });
    if (messageInput) messageInput.scrollIntoView();
  
    return function cleanup () { 
      setMessageSounds({});
    };
  }, []);
  // 
  React.useEffect(() => {
    const messagesView = document.getElementById("messagesView");
    if (messagesView) messagesView.scrollTo(0, messagesView.scrollHeight);
  }, [ loadedAdminConversations ]);

  const setConversationTitle = (messages, adminState) => {
    let conversationTitle;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].sender != adminState.firstName ) {
        conversationTitle = messages[i].sender;
        break;
      }
    }
    return conversationTitle ;
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = (e): void => {
    // first get the user information //
    if (message.length === 0) return;
    const messageData: MessageData = {
      _id: ObjectID().toHexString(),
      conversationId: activeConversation.conversationId,
      sender: "admin",
      senderSocketId: "",
      receiverSocketId: activeConversation.receiverSocketId,
      messageContent: message,
      sentAt: new Date().toISOString()
    };
    sendAdminMessage(messageData, adminConversationState)
      .then((success) => {
        if (success && messageSounds.sendMessageSound) messageSounds.sendMessageSound.play();
        setMessage("")
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  const handleKeyPress = (e): void => {
    if (e.key === "Enter") {
      // handle messages submission here //
      if (message.length === 0) return;
      const messageData: MessageData = {
        _id: ObjectID().toHexString(),
        conversationId: activeConversation.conversationId,
        sender: "admin",
        senderSocketId: "",
        receiverSocketId: activeConversation.receiverSocketId,
        messageContent: message,
        sentAt: new Date().toISOString()
      };
      sendAdminMessage(messageData, adminConversationState)
        .then((success) => {
          if (success && messageSounds.sendMessageSound) messageSounds.sendMessageSound.play();
          setMessage("");
        })
        .catch((error) => {
          // error handling here later //
          console.log(error);
        });
    }
  };

  return (
    <React.Fragment>
      <div className={ styles.messagesViewWrapper }>
        <div className={ styles.adminConvHeaderWrapper }>
          <div className={ styles.adminConvHeader }>
            <p>ConversationWith: {adminConversationState.activeConversation.conversationName}</p>
          </div>
          <div className={ styles.adminConvClose } onClick={ closeConversation }>
            <p>Close Conversation</p>
          </div>
        </div>
        <div className={ styles.messagesViewMessageDiv} id="messagesView">
          
         
          {
            activeConversation.messages.map((message) => {
              return <Message key={message._id} messageData={message} adminState={adminState} />
            })
          }
        </div>
      </div>
      <div className={ styles.messagesInputWrapper}>
        <Input 
          className={ styles.messagesInput }
          action={{
            icon: "send",
            content: "Send",
            onClick: sendAdminMessage
          }}
          onChange={handleInputChange}
          placeholder='message...' 
          style={{position: "absolute", bottom: 0, left: 0, right: 0, height: "50px"}}
          onKeyPress={handleKeyPress}
          value={ message }
          />
        </div>
    </React.Fragment>
  )
};

export default MessagesView;