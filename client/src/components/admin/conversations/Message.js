import React from "react";
import {
  Comment
} from "semantic-ui-react";
// style imports //
import { messageStyle, responseStyle } from "./styles/style";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
const Message = (props) => {
  const { message, clientState } = props;
  if (message.sender === clientState.name) {
    return (
      <Comment style={messageStyle}>
        <Comment.Content>
          <Comment.Author>{message.sender}</Comment.Author>
          <Comment.Content>{message.content}</Comment.Content>
          <Comment.Metadata>Sent At: {formatDate(message.sentAt, { military: true })}</Comment.Metadata>
          <Comment.Metadata>Read</Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  } else {
    return(
      <Comment style={responseStyle}>
        <Comment.Content>
          <Comment.Author>{message.sender}</Comment.Author>
          <Comment.Content>{message.content}</Comment.Content>
          <Comment.Metadata>Sent At: {formatDate(message.sentAt, { military: true })}</Comment.Metadata>
          <Comment.Metadata>Read</Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  }
  
};

export default Message;