import React from "react";
import PropTypes from "prop-types";
import {
  Comment
} from "semantic-ui-react";
import { formatDate } from "../helpers/dateHelpers";

export const messageStyle = {
  border: "1px solid grey",
  borderRadius: "5px",
  float: "right",
  padding: "1em",
  width: "50%",
  clear: "both"
}

export const responseStyle = {
  border: "1px solid yellow",
  borderRadius: "5px",
  float: "left",
  padding: "1em",
  width: "50%",
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
