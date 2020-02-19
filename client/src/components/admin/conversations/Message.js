import React from "react";
import {
  Comment
} from "semantic-ui-react";
// style imports //
import { messageStyle } from "./styles/style";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
const Message = (props) => {
  const { message } = props;
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
};

export default Message;