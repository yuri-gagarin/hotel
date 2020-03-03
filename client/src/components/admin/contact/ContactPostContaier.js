import React from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import {
  Button, Card, Grid, GridColumn
} from "semantic-ui-react";
// redux imports //
import { connect } from "react-redux";
import { openContactPost, deleteContactPost } from "./../../../redux/actions/contactPostActions";
// helper functions //
import { formatDate } from "./../../helpers/dateHelpers";

const ContactPostHolder = (props) => {
  const { post } = props;
  const { name, email, phoneNumber, content, createdAt } = post;

  const handleOpenPost = () => {

  };
  const handleDeletePost = () => {

  }
  return (
    <Card>
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
          <Button basic color='green'>
            Open
          </Button>
          <Button basic color='red'>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

const ContactPostContainer = (props) => {
  const { contactPostState } = props;
  const { createdPosts } = contactPostState;
  console.log(contactPostState);
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          Contact Information Requests
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={5} style={{ height: "90vh", overflow: "scroll" }}>
          <Card.Group>
          {
            createdPosts.map((post) => {
              return (
                <ContactPostHolder 
                  key={post._id}
                  post={post}
                />
              );
            })
          }
          </Card.Group>
          
        </Grid.Column>
        <Grid.Column width={11}>  

        </Grid.Column>
      </Grid.Row>
      

    </React.Fragment>
    
  );
};
// PropTypes validation //
ContactPostContainer.propTypes = {
  contactPostState: PropTypes.object.isRequired
};

export default ContactPostContainer;