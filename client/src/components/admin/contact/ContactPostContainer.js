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
import { operationSuccessful, setAppError } from "./../../../redux/actions/appGeneralActions";
// style imports //
import {
  contactScreenStyle
} from "./style/styles";

const ContactPostContainer = (props) => {
  const { contactPostState } = props;
  // reducer functions //
  const { 
    fetchContactPosts, openContactPost, 
    closeContactPost, handleContactPostDelete,
    operationSuccessful, setAppError
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
  };
  const sendContactReply = (postData) => {
    operationSuccessful({ status: "200", responseMsg: "Reply sent" });
  };

  return (
    <React.Fragment>
      <Grid.Row style={contactScreenStyle.headerRow}>
        <Grid.Column width={16} textAlign="center" style={contactScreenStyle.headerText}>
          Contact Information Requests
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={5} style={contactScreenStyle.cardColumn}>
          <Card.Group style={contactScreenStyle.cardGroup}>
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
        <Grid.Column width={11} style={{ padding: 0 }}>  
          <ContactPostView 
            postOpen={postOpen} 
            post={contactPostState.contactPost} 
            handleClosePost={handleClosePost}
            sendContactReply={sendContactReply}
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
    },
    operationSuccessful: (status, responseMsg) =>  {
      return dispatch(operationSuccessful(status, responseMsg));
    },
    setAppError: (status, responseMsg) => {
      return dispatch(setAppError(status, responseMsg));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPostContainer);