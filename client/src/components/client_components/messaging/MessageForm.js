// @flow
import * as React from "react";
import ObjectID from "bson-objectid";
import { Loader } from "semantic-ui-react";
// styles  and images //
import styles from "./css/messageForm.module.css";
// additional compononets //
import MessengerInput from "./MessengerInput";
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
  handleContinueConversation: (conversationId: string) => void;
  // messaging //
  handleSendMessage: (messageDate: MessageData) => Promise<boolean>;
  handleSendMessageSuccess: (messageData: MessageData) => Promise<boolean>;
};

type SoundState = {
  sendMessageSound: HTMLAudioElement | null;
  receiveMessageSound: HTMLAudioElement | null;
};


const MessageForm = ({ open, clientState, conversationState, handleSendMessage, handleSendMessageSuccess, handleConversationClose, handleContinueConversation }: Props): React.Node => {
  const [ messageSounds, setMessageSounds ] = React.useState<SoundState>({ sendMessageSound: null, receiveMessageSound: null }); 
  const messageFormRef = React.useRef<HTMLDivElement | null>(null);
  const messagesContentRef = React.useRef<HTMLDivElement | null>(null);
  // redux state objects //
  // additional functions //
  const { _id: clientId } = clientState;
  const { loading, conversationActive, messengerOpen, conversationId, messageSending, messages } = conversationState;

  React.useEffect(() => {
    const messageInput = document.getElementById("lastMessageSpacer");
    // cache the message sounds //
    setMessageSounds({ 
      sendMessageSound: new Audio("/assets/media/sounds/sentMsg.mp3"),
      receiveMessageSound: new Audio("/assets/media/sounds/receiveMsg.mp3")
    });

    return () => {
      setMessageSounds({});
    };
  }, []);

  React.useEffect(() => {
    if (messagesContentRef.current) {
      //console.log(messagesContentRef.current.scrollHeight);
      messagesContentRef.current.scrollTop = messagesContentRef.current.scrollHeight;
    }
  }, [ messagesContentRef.current, messages ]);

  const sendMessage = (content: string): Promise<boolean> => {
    const newMessageData: MessageData = {
      _id: ObjectID().toHexString(),
      conversationId: conversationId ? conversationId : `CONVERSATION_${socket.id}`,
      receiverSocketId: "",
      senderSocketId: socket.id,
      sender: "client",
      messageContent: content,
      sentAt: new Date(Date.now()).toISOString(),
    };
    return handleSendMessage(newMessageData)
      .then((success) => {
        if (success) {
          if (messageSounds.sendMessageSound) {
            try {
              messageSounds.sendMessageSound.play();
            } catch (error) {
              console.log(error);
            }
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

  const continueConversation = (): void => {
    handleContinueConversation(conversationId);
  };

  return (
    <div className={ `${styles.messageForm} ${ open ? styles.messageFormDisplayed : ""}` } ref={messageFormRef}>
      <div className={ styles.messageFormControls } onClick={ closeMessageForm }>
        <div className={ styles.messageFormControlsWrapper }>
          <i className={ `far fa-times-circle ${ styles.messageFormCloseIcon }` }></i>
        </div>
      </div>
      <div className={ styles.messengerContentView } ref={messagesContentRef}>
        { 
          messages.map((message) => {
            return (
              <Message key={ message._id } messageData={ message } />
            )
          })
        }
        {
          !conversationActive
          ?
          <div className={ styles.messengerContinueConversationDiv }>
            {
              !loading
              ?
              <div className={ styles.messengerContinueMessage }>
                <div onClick={ continueConversation }>Click to continue conversation</div>
              </div>
              :
              <div className={ styles.messengerContinueLoaderWrapper }>
                <Loader active={true} className={ styles.messengerContinueLoader } />
              </div>
            }
          </div>
          :
          null
        }
        
      </div>
     
      <div className={ styles.messengerInputDiv }>
        <MessengerInput
          loading={ conversationState.messageSending }
          sendMessage={ sendMessage }
        />
      </div>
      
    </div>
  );
  
};

export default MessageForm;