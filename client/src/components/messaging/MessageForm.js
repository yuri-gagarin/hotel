import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
// styles  and images //
import { messageForm} from "./style/styles";
// additional compononets //
import MessagesInitView from "./MessageInitView";
import MessageView from "./MessageView";
import Message from "./Message";
// redux imports // 
import { connect } from "react-redux";
import { sendMessageRequest } from "../../redux/actions/messageActions";
import { setGuestClient } from "../../redux/actions/clientActions";

const MessageForm = (props) => {
  const messageFormRef = useRef(null);
  const [userIsMessaging, setUserIsMessaging] = useState(false);
  const formOpen = useState(false);
  const { 
    handleFormOpen,
    handleMessageRequest, 
    clientState ,
    setClientState
  } = props;
  const { messages } = props.conversationState;
  const toggleMessageForm = (e) => {
    handleFormOpen();
    // maybe animate later //
    messageFormRef.current.style.display = "none";
  };
  const sendInitialMessage = (messageData) => {
    const { user, content } = messageData;
    handleMessageRequest(user, null, content);
    if (!clientState.userId) {
      setClientState({userId: user._id, name: user.name, email: user.email });
    }
    console.log(clientState);
  };
  return (
    <div style={messageForm.formContainer} ref={messageFormRef}>
      <div style={messageForm.closeMessageForm} onClick={toggleMessageForm}>
        <span>X</span>
      </div>
      <div style={messageForm.messageView}>
          { 
            messages.map((message) => {
              return (
                <Message 
                  key={message._id}
                  content={message.content}
                  send={message.sender}
                  read={message.read}
                  createdAt={message.createdAt}
                />
              );
            })
          }
      </div>
      {
        userIsMessaging ? <MessageView /> : <MessagesInitView sendInitialMessage={sendInitialMessage}/>
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
  handleMessageRequest: PropTypes.func.isRequired,
  setClientState: PropTypes.func.isRequired
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
    handleMessageRequest: (user, conversationId, messageData) => {
      return sendMessageRequest(dispatch, { user, conversationId, messageData });
    },
    setClientState: (userData) => dispatch(setGuestClient(userData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);