// @flow
import * as React from "react";
import { Comment } from "semantic-ui-react";
import { formatDate } from "./../../helpers/dateHelpers";
// types //
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";

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

type Props = {
  messageData: MessageData;
}

export const Message = ({ messageData }: Props): React.Node => {
  const { messageContent, sender, sentAt } = messageData;
  if (sender ==="client") {
    return (
      <Comment style={messageStyle}>
        <Comment.Content>
          <Comment.Author>
            { sender }
          </Comment.Author>
          <Comment.Text>
            { messageData }
          </Comment.Text>
          <Comment.Metadata>
            <div>{ formatDate(sentAt, { military: true }) }</div>
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
            { messageData }
          </Comment.Text>
          <Comment.Metadata>
            <div>{ formatDate(sentAt, { military: true }) }</div>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
    );
  }
};

export default Message;
