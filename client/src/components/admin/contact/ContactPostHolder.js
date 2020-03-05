import React from "react";
import PropTypes from "prop-types";
// semantinc ui react //
import {
  Card, Button
} from "semantic-ui-react";
// helper functions //
import { formatDate } from "../../helpers/dateHelpers";

const ContactPostHolder = (props) => {
  const { post, handleOpenPost, handleDeletePost } = props;
  const { name, email, phoneNumber, content, createdAt } = post;
 
  return (
    <Card fluid>
      <Card.Content>
      <Card.Header>{post.name}</Card.Header>
        <Card.Meta as={"a"}>Email: {email}</Card.Meta>
        <Card.Meta>Sent: {formatDate(createdAt, { military: true })}</Card.Meta>
        <Card.Description>
          {content}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => handleOpenPost(post._id)}>
            Open
          </Button>
          <Button basic color='red' onClick={() => handleDeletePost(post._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ContactPostHolder;