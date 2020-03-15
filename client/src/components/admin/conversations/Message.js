import React from "react";
import {
  Comment
} from "semantic-ui-react";
// style imports //
import { messageStyle, responseStyle } from "./styles/style";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
const Message = (props) => {
  const { message, adminState } = props;
  if (message.sender !== adminState.firstName) {
    return (
      <Comment style={responseStyle}>
        <Comment.Content>
          <Comment.Author style={{ marginBottom: "0.5em" }}>
            <span>From: </span>{message.sender}</Comment.Author>
          <Comment.Content style={{ marginBottom: "0.5em" }}>
            {message.content}
          </Comment.Content>
          <Comment.Metadata style={{ marginLeft: 0 }}>
            Sent At: {formatDate(message.sentAt, { military: true })}
          </Comment.Metadata>
          <Comment.Metadata>Read</Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  } else {
    return(
      <Comment style={messageStyle}>
        <Comment.Content>
          <Comment.Author style={{ marginBottom: "0.5em" }}>
            <span>From: </span>{message.sender}
          </Comment.Author>
          <Comment.Content style={{ marginBottom: "0.5em" }}>
            {message.content}
          </Comment.Content>
          <Comment.Metadata style={{ marginLeft: 0 }}>
            Sent At: {formatDate(message.sentAt, { military: true })}
          </Comment.Metadata>
          <Comment.Metadata>Read</Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  }
  
};

export default Message;