// @flow
import * as React from "react";
import ObjectID from "bson-objectid";
// styles  and images //
import { messageForm } from "./style/styles";
import styles from "./css/messageForm.module.css";
// additional compononets //
import MessageView from "./MessageView";
import Message from "./Message";
// socket io //
import { socket } from "./../../../App";
// types //
import type { ClientState } from "../../../redux/reducers/client/flowTypes";
import type { ConversationState, MessageData } from "../../../redux/reducers/conversations/flowTypes";

type Props = {
  open: boolean;
  clientState: ClientState;
  conversationState: ConversationState;
  // redux actions //
  // client //
  handleConversationClose: () => void;
  // messaging //
  handleSendMessage: (messageDate: MessageData) => Promise<boolean>;
  handleSendMessageSuccess: (messageData: MessageData) => Promise<boolean>;
  handleReceiveMessage: (messageData: MessageData) => Promise<boolean>;
};

type SoundState = {
  sendMessageSound: HTMLAudioElement | null;
  receiveMessageSound: HTMLAudioElement | null;
};

const MessageForm = ({ open, clientState, conversationState, handleSendMessage, handleSendMessageSuccess, handleReceiveMessage, handleConversationClose }: Props): React.Node => {
  const [ messageSounds, setMessageSounds ] = React.useState<SoundState>({ sendMessageSound: null, receiveMessageSound: null }); 
  const messageFormRef = React.useRef<HTMLDivElement | null>(null);
  // redux state objects //
  // additional functions //
  const { _id: clientId } = clientState;
  const { loading, messengerOpen, conversationId, messageSending, messages } = conversationState;

  React.useEffect(() => {
    const messageInput = document.getElementById("lastMessageSpacer");

    socket.on("sendMessageSuccess", (messageData: MessageData) => {
      handleReceiveMessage(messageData);
    });
    socket.on("messageReceived", (messageData: MessageData) => {
      // listen for new incoming messages from admin //
      const { id: socketId } = socket;
      handleReceiveMessage(messageData);
    });
  }, []);
 
  React.useEffect(() => {
    // cache the message sounds //
    setMessageSounds({ 
      sendMessageSound: new Audio("/assets/media/sounds/sentMsg.mp3"),
      receiveMessageSound: new Audio("/assets/media/sounds/receiveMsg.mp3")
    });

    return () => {
      setMessageSounds({});
    };
  }, []);

  const sendMessage = (content: string): Promise<boolean> => {
    const newMessageData: MessageData = {
      _id: ObjectID().toHexString(),
      conversationId: conversationId ? conversationId : "",
      receiverSocketId: "",
      senderSocketId: socket.id,
      sender: "client",
      messageContent: content,
      sentAt: new Date(Date.now()).toISOString(),
    }
    return handleSendMessage(newMessageData)
      .then((success) => {
        if (success) {
          if (messageSounds.sendMessageSound) {
            messageSounds.sendMessageSound.play();
          }
        }
        return Promise.resolve(true);
      })
      .catch((err) => {
        // err handling here //
        return Promise.resolve(false);
      })
  };


  const closeMessageForm = (e) => {
    setTimeout(() => {
      handleConversationClose();
    }, 1000);
    if (messageFormRef && messageFormRef.current) {
      messageFormRef.current.classList.add(styles.hideMessageForm);
    }
    
    // maybe animate later //
  };

  return (
    <div className={ `${styles.messageForm} ${ open ? styles.messageFormDisplayed : ""}` } ref={messageFormRef}>
      <div className={ styles.messageFormControls } onClick={ closeMessageForm }>
        <i className={ `far fa-times-circle ${ styles.messageFormCloseIcon }` }></i>
      </div>
      <div className={ styles.messengerContentView }>
          { 
            messages.map((message) => {
              return (
                <Message 
                  key={ message._id }
                  messageData={ message }
                  clientState={ clientState } 
              />
              )
            })
          }
      </div>
      <MessageView 
        sendMessage={ sendMessage }
        clientState={clientState}
      />
    </div>
  );
  
};

export default MessageForm;