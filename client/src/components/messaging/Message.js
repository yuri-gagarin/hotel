import React from "react";
import PropTypes from "prop-types";
import {
  Comment
} from "semantic-ui-react";
import { formatDate } from "../helpers/dateHelpers";

export const messageStyle = {
  borderRadius: "5px",
  color: "white",
  backgroundColor: "rgb(3, 161, 252)",
  margin: "0.5em",
  minWidth: "50%",
  maxWidth: "75%",
  float: "right",
  padding: "1em",
  width: "auto",
  clear: "both"
}

export const responseStyle = {
  borderRadius: "5px",
  color: "white",
  backgroundColor: "rgb(25, 140, 52)",
  margin: "0.5em",
  minWidth: "50%",
  maxWidth: "75%",
  float: "left",
  padding: "1em",
  width: "auto",
  clear: "both"
}

export const Message = (props) => {
  const { content, read, sender, sentAt } = props.message;
  const { clientState } = props;
  if (clientState.name === sender) {
    return (
      <Comment style={messageStyle}>
        <Comment.Content>
          <Comment.Author>
            { sender }
          </Comment.Author>
          <Comment.Text>
            { content }
          </Comment.Text>
          <Comment.Metadata>
            <div>{ formatDate(sentAt, { military: true }) }</div>
            <div>{ read }</div>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  } else {
    return (
      <Comment style={responseStyle}>
        <Comment.Content>
          <Comment.Author>
            { sender }
          </Comment.Author>
          <Comment.Text>
            { content }
          </Comment.Text>
          <Comment.Metadata>
            <div>{ formatDate(sentAt, { military: true }) }</div>
            <div>{ read }</div>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  }
};

export default Message;
