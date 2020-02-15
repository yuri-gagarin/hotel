import React from "react";
import PropTypes from "prop-types";
import {
  Comment
} from "semantic-ui-react";

export const Message = (props) => {
  const { content, read, createdAt, firstName } = props;

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>
          { firstName }
        </Comment.Author>
        <Comment.Text>
          { content }
        </Comment.Text>
        <Comment.Metadata>
          <div>{ createdAt }</div>
          <div>{ read }</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
