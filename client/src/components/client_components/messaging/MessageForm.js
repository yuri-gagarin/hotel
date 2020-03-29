import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
// styles  and images //
import { messageForm} from "./style/styles";
// additional compononets //
import MessagesInitView from "./MessageInitView";
import MessageView from "./MessageView";
import Message from "./Message";
// redux imports // 
import { connect } from "react-redux";
import { sendClientMessage } from "./../../../redux/actions/messageActions";
import { updateConversation } from "./../../../redux/actions/conversationActions";
import { setGuestClient } from "./../../../redux/actions/clientActions";
// socket io //
import { socket } from "./../../../App";

const MessageForm = (props) => {
  const [messageSounds, setMessageSounds] = useState({}); 
  const messageFormRef = useRef(null);
  // redux state objects //
  const { 
    clientState,
    conversationState,
    messageState,
  } = props;
  // redux action dispatch functions //
  const {
    _sendClientMessage, _setGuestClient, _updateConversation
  } = props;
  // additional functions //
  const { handleFormOpen } = props;
  const { messages, userMessaging, conversationId } = conversationState;
  const user = { ...clientState };

  useEffect(() => {
    socket.on("newAdminMessage", (data) => {
      // listen for new incoming messages from admin //
      const { clientSocketId, newMessage } = data;
      _updateConversation({clientSocketId: clientSocketId, conversationId: newMessage.conversationId,
                          message: newMessage, adminSocketId: null });
    });
  }, []);

  const toggleMessageForm = (e) => {
    handleFormOpen();
    // maybe animate later //
    const node = ReactDom.findDOMNode(messageFormRef.current);
    node.classList.toggle("transitionedForm");
  };

  const handleInitialMessage = (messageData) => {
    const { user, content } = messageData;
    _sendClientMessage(null, content, user)
      .then((success) => {
        if (success) {
          _setGuestClient(user);
          messageSounds.sendMessageSound.play();
        }
      });
    // update client state with name of user //
    //_setGuestClient({ _id: _id, firstName: firstName, email: email });
  };

  const sendMessage = (content) => {
    _sendClientMessage(conversationId, content, user)
      .then((success) => {
        if (success) {
          messageSounds.sendMessageSound.play();
        }
      });
  };

  useEffect(() => {
    const messageInput = document.getElementById("lastMessageSpacer");
    // cache the message sounds //
    setMessageSounds({
      ...messageSounds,
      sendMessageSound: new Audio("/assets/media/sounds/sentMsg.mp3"),
      receiveMessageSound: new Audio("/assets/media/sounds/receiveMsg.mp3")
    });

    return () => {
      setMessageSounds({});
    };
  }, []);

  const renderMessages = (messages) => {
    return messages.map((message) => {
      return <Message 
        key={message._id}
        message={message}
        clientState={clientState}
       />
    });
  };

  return (
    <div className="clientMessageFormContainer" ref={messageFormRef} id="clientMessageForm">
      <div style={messageForm.closeMessageForm} onClick={toggleMessageForm}>
        <span>X</span>
      </div>
      <div style={messageForm.messageView}>
          { 
           [ ...renderMessages(messages) ]
          }
      </div>
      {
        userMessaging ?
        <MessageView 
          sendMessage={sendMessage}
          clientState={clientState}
        />
        :
        <MessagesInitView 
          handleInitialMessage={handleInitialMessage}
          clientState={clientState}
        />
      }
    </div>
  );
  
};
// PropTypes validation //
MessageForm.propTypes = {
  clientState: PropTypes.object.isRequired,
  conversationState: PropTypes.object.isRequired,
  messageState: PropTypes.object.isRequired,
  handleFormOpen: PropTypes.func.isRequired,
  _sendClientMessage: PropTypes.func.isRequired,
  _setGuestClient: PropTypes.func.isRequired
};

// redux connect //
const mapStateToProps = (state) => {
  return {
    clientState: state.clientState,
    conversationState: state.conversationState,
    messageState: state.messageState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _sendClientMessage: (conversationId, messageContent, user) => {
      return sendClientMessage(dispatch, conversationId, messageContent, user);
    },
    _setGuestClient: (userData) => dispatch(setGuestClient(userData)),
    _updateConversation: (conversationData) => dispatch(updateConversation(conversationData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);