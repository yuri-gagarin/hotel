import React, { useState } from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import {
  Button, Card, Container, Grid, 
} from "semantic-ui-react";
// text editor //
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// redux imports //
import { connect } from "react-redux";
import { openContactPost, deleteContactPost } from "../../../redux/actions/contactPostActions";
// helper functions //
import { formatDate } from "../../helpers/dateHelpers";

const ContactPostHolder = (props) => {
  const { post, handleOpenPost, handleDeletePost } = props;
  const { name, email, phoneNumber, content, createdAt } = post;
 

 
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
}
const ContactPostView = (props) => {
  const { postOpen } = props;

  if (postOpen) {
    return (
      <React.Fragment>
        <Container>
          <Grid.Row>
            <Grid.Column>
              Message from: {post.name}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              Email: somemail
            </Grid.Column>
            <Grid.Column width={8}>
              Phone: "some phone here"
            </Grid.Column>
          </Grid.Row>
        </Container>
        <Container>
        <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
            editor={ ClassicEditor }
            data="<p>Hello from CKEditor 5!</p>"
            onInit={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
          />
        </Container>

      </React.Fragment>
      
    )
  } else {
    return (
      <div></div>
    );
  }
  
}

const ContactPostContainer = (props) => {
  const { contactPostState } = props;
  const { createdPosts } = contactPostState;
  // local state //
  const [postOpen, setPostOpen] = useState(false);

  const handleOpenPost = (contactPostId) => {
    console.log(contactPostId);
    setPostOpen(true);
  };
  const handleDeletePost = (contactPostId) => {
    console.log(contactPostId);
  };

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
                  handleOpenPost={handleOpenPost}
                  handleDeletePost={handleDeletePost}
                />
              );
            })
          }
          </Card.Group>
          
        </Grid.Column>
        <Grid.Column width={11}>  
          <ContactPostView postOpen={postOpen} />
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