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

const MessageForm = (props) => {
  const messageFormRef = useRef(null);
  const [userIsMessaging, setUserIsMessaging] = useState(false);
  const formOpen = useState(false);
  const { handleFormOpen, handleMessageRequest } = props;
  const { messages } = props.conversationState;


  const toggleMessageForm = (e) => {
    handleFormOpen();
    // maybe animate later //
    messageFormRef.current.style.display = "none";
  };
  const sendInitialMessage = (messageData) => {
    const { user, content } = messageData;
    handleMessageRequest(user, null, content);
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

MessageForm.propTypes = {
  handleFormOpen: PropTypes.func.isRequired
};

// redux connect //
const mapStateToProps = (state) => {
  return {
    conversationState: state.conversationState,
    messageState: state.messageState
  };
};
const mapDispatchToProps = (dispatch) => {
  console.log(67);
  console.log(dispatch);
  return {
    handleMessageRequest: (user, conversationId, messageData) => sendMessageRequest(dispatch, { user, conversationId, messageData })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);