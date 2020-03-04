import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import {
  Card, Grid
} from "semantic-ui-react";
// additional components //
import ContactPostHolder from "./ContactPostHolder";
import ContactPostView from "./ContactPostView";
// redux imports //
import { connect } from "react-redux";
import { 
  openContactPost, closeContactPost, handleContactPostDelete, fetchContactPosts
} from "../../../redux/actions/contactPostActions";


const columnStyle = {
  border: "1px solid red"
}



const ContactPostContainer = (props) => {
  const { contactPostState } = props;
  // reducer functions //
  const { 
    fetchContactPosts, openContactPost, 
    closeContactPost, handleContactPostDelete
  } = props
  const { createdPosts } = contactPostState;
  // local state //
  const [postOpen, setPostOpen] = useState(false);
  // load posts on component mount //
  useEffect(() => {
    fetchContactPosts();
  }, []);

  const handleOpenPost = (contactPostId) => {
    const { createdPosts } = contactPostState;
    openContactPost(contactPostId, createdPosts);
    setPostOpen(true);
  };
  const handleDeletePost = (contactPostId) => {
    const  { createdPosts } = contactPostState;
    handleContactPostDelete(contactPostId, createdPosts);
  };
  const handleClosePost = (contactPostId) => {
    closeContactPost(contactPostId);
    setPostOpen(false);
  }

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
          <ContactPostView 
            postOpen={postOpen} 
            post={contactPostState.contactPost} 
            handleClosePost={handleClosePost} 
          />
        </Grid.Column>
      </Grid.Row>
      

    </React.Fragment>
    
  );
};
// PropTypes validation //
ContactPostContainer.propTypes = {
  contactPostState: PropTypes.object.isRequired,
  openContactPost: PropTypes.func.isRequired,
  closeContactPost: PropTypes.func.isRequired,
  handleContactPostDelete: PropTypes.func.isRequired
};
// redux mapping functions //
const mapStateToProps = (state) => {
  return {

  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchContactPosts: () => {
      return fetchContactPosts(dispatch);
    },
    openContactPost: (postId, createdPosts) => {
      return dispatch(openContactPost(postId, createdPosts));
    },
    closeContactPost: (postId) => {
      return dispatch(closeContactPost(postId));
    },
    handleContactPostDelete: (postId, createdPosts) => {
      return handleContactPostDelete(dispatch, postId, createdPosts);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPostContainer);