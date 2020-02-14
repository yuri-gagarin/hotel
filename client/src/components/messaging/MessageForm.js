import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
// styles  and images //
import { messageForm} from "./style/styles";
// additional compononets //
import MessagesInitView from "./MessageInitView";
import MessageView from "./MessageView";

const MessageForm = (props) => {
  const messageFormRef = useRef(null);
  const [userIsMessaging, setUserIsMessaging] = useState(false);
  const formOpen = useState(false);
  const { handleFormOpen} = props;

  const toggleMessageForm = (e) => {
    handleFormOpen();
    // maybe animate later //
    messageFormRef.current.style.display = "none";
  };
  const sendInitialMessage = (message) => {
    setUserIsMessaging(true);
    console.log(message);
  };
  return (
    <div style={messageForm.formContainer} ref={messageFormRef}>
      <div style={messageForm.closeMessageForm} onClick={toggleMessageForm}>
        <span>X</span>
      </div>
      <div style={messageForm.messageView}>
        <div>Message</div>
        <div>Message</div>
        <div>Message</div>
        <div>Message</div>
        <div>Message</div>
        <div>Message</div>
        <div>Message</div>
        <div>Message</div>
      </div>
      {
        userIsMessaging ? <MessageView /> : <MessagesInitView sendInitialMessage={sendInitialMessage}/>
      }
    </div>
  )
  
};

MessageForm.propTypes = {
  handleFormOpen: PropTypes.func.isRequired
};

export default MessageForm;