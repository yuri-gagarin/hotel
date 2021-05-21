// @flow
import * as React from "react";
import { Comment, Grid, Input, Segment } from "semantic-ui-react";
import ObjectID from "bson-objectid";
// additional component imports //
import Message from "./Message";
// style imports //
import { conversationTitle } from "./styles/style";
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
  const [messageSounds, setMessageSounds] = React.useState({});
  const [sendBtnDisabled, setSendButtondDisabled] = React.useState(true);
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
  }, [])
  // 
  React.useEffect(() => {
    const messagesView = document.getElementById("messagesView");
    const messageInput = document.getElementById("messageInput");
    if (messageInput) messageInput.scrollIntoView();
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
    const messageData: MessageData = {
      _id: ObjectID().toHexString(),
      conversationId: activeConversation.conversationId,
      sender: "admin",
      senderSocketId: "",
      receiverSocketId: "",
      messageContent: message,
      sentAt: new Date().toISOString()
    };
    sendAdminMessage(messageData, adminConversationState)
      .then((success) => {
        if (success && messageSounds.sendMessageSound) messageSounds.sendMessageSound.play();
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  const handleKeyPress = (e): void => {
    if (e.key === "Enter") {
      // handle messages submission here //
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
        })
        .catch((error) => {
          // error handling here later //
          console.log(error);
        });
    }
  };

  return (
    <Grid.Column width={11} style={{ height: "90vh", padding: 0 }}>
      <Segment style={{ overflowY: "scroll", height: "100%", paddingBottom: "60px", position: "relative" }} id="messagesView">
        <Comment.Group style={{ maxWidth: "none" }}>
          <div className="adminConvHeader">
            <div className="adminConvTitle">
              <p>ConversationWith: { setConversationTitle(activeConversation.messages, adminState) }</p>
            </div>
            <div className="adminCloseConvButton" onClick={ closeConversation }>
              <p>Close Conversation</p>
            </div>
          </div>
         
          {
            activeConversation.messages.map((message) => {
              return <Message key={message._id} message={message} adminState={adminState} />
            })
          }
        </Comment.Group>
      </Segment>
      <Input 
        id="messageInput"
        action={{
          icon: "send",
          content: "Send",
          onClick: sendAdminMessage,
          disabled: sendBtnDisabled
        }}
        onChange={handleInputChange}
        placeholder='message...' 
        style={{position: "absolute", bottom: 0, left: 0, right: 0, height: "50px"}}
        onKeyPress={handleKeyPress}
        />
    </Grid.Column>
  )
};

export default MessagesView;