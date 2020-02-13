import React from "react";
import {
  Comment
} from "semantic-ui-react";
// style imports //
import { messageStyle } from "./styles/style";

const Message = (props) => {
  return (
    <Comment style={messageStyle}>
      <Comment.Content>
        <Comment.Author>Comment Author</Comment.Author>
        <Comment.Content>Message Content Here</Comment.Content>
        <Comment.Metadata>Sent At: "Some time Here"</Comment.Metadata>
        <Comment.Metadata>Read: "boolean here"</Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};

export default Message;