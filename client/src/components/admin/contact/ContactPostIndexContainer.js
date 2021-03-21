// @flow
import * as React from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import { Card, Grid } from "semantic-ui-react";
// additional components //
import { ContactPostCards } from "./ContactPostCards";
import ContactPostView from "./ContactPostView";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
// redux imports //
import { connect } from "react-redux";
import { handleOpenContactPost, handleCloseContactPost, clearContactPostData, handleContactPostDelete, handleFetchContactPosts } from "../../../redux/actions/contactPostActions";
import { operationSuccessful, setAppError } from "../../../redux/actions/appGeneralActions";
// flow types //
import type { ContactPostState, ContactPostData, ContactPostAction } from "../../../redux/reducers/contact_posts/flowTypes";
import type { Dispatch } from "../../../redux/reducers/_helpers/createReducer";
// style imports //
import styles from "./css/contactPostsIndexContainer.module.css";
// helpers //

const { useEffect, useState } = React;

type OwnProps = {|
  contactPostState: ContactPostState
|};
type Props = {|
  ...OwnProps,
  handleFetchContactPosts: () => Promise<boolean>,
  handleCloseContactPost: () => void,
  handleOpenContactPost: (contactPostId: string, contactPostState: ContactPostState) => void,
  handleContactPostDelete: (contactPostId: string, contactPostState: ContactPostState) => Promise<boolean>
|};
type LocalState = {
  confirmDeleteModalOpen: boolean,
  contactPostIdToDelete: string
}
const ContactPostContainer = (props : Props): React.Node => {
  const { contactPostState } = props;
  // reducer functions //
  const { handleFetchContactPosts, handleOpenContactPost,  handleCloseContactPost, handleContactPostDelete } = props
  const { createdContactPosts } = contactPostState;
  // local state //
  const [ localState, setLocalState ] = useState<LocalState>({ confirmDeleteModalOpen: false, contactPostIdToDelete: "" });
  // load posts on component mount //

  useEffect(() => {
    handleFetchContactPosts();
  }, []);

  const openContactPost = (contactPostId: string) => {
    return handleOpenContactPost(contactPostId, contactPostState);
  };
  const deleteContactPost = (contactPostId: string) => {
    return handleContactPostDelete(contactPostId, contactPostState);
  };
  const closeContactPost = () => {
    handleCloseContactPost();
  };
  const sendContactReply = () => {

  };
  const triggerContactPostDelete = (postIdToDelete: string) => {
    setLocalState({ ...localState, confirmDeleteModalOpen: true, contactPostIdToDelete: postIdToDelete });
  }
  const cancelDeleteAction = () => {
    setLocalState({ ...localState, confirmDeleteModalOpen: false, contactPostIdToDelete: "" });
  }
  const confirmDeleteContactPost = () => {
    const { confirmDeleteModalOpen, contactPostIdToDelete  } = localState;
    if (confirmDeleteModalOpen && contactPostIdToDelete) {
      return handleContactPostDelete(contactPostIdToDelete, contactPostState);
    } else {
      return Promise.resolve(false);
    }
  }

  return (
    <Grid className={ styles.contactPostsIndexContainer }>
      <ConfirmDeleteModal 
        open={ localState.confirmDeleteModalOpen } 
        modelName="contact" 
        confirmAction={ confirmDeleteContactPost }
        cancelAction={ cancelDeleteAction }
      />
      <Grid.Row>
        <Grid.Column width={ 6 } className={ styles.postsColumn }>
          <div className={ styles.postsColumnInner }>
            <ContactPostCards 
              createdContactPosts={ createdContactPosts } 
              openContactPost={ openContactPost }
              triggerContactPostDelete={ triggerContactPostDelete } />
          </div>
        </Grid.Column>
        <Grid.Column width={ 10 } style={{ padding: 0 }}>  
          <ContactPostView 
            contactPost={ contactPostState.contactPostData } 
            handleClosePost={ closeContactPost }
            sendContactReply={ sendContactReply }
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>        
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ContactPostAction>) => {
  return {
    handleFetchContactPosts: () => {
      return handleFetchContactPosts(dispatch);
    },
    handleOpenContactPost: (postId: string, contactPostState: ContactPostState) => {
      return handleOpenContactPost(dispatch, postId, contactPostState);
    },
    handleCloseContactPost: () => {
      return handleCloseContactPost(dispatch);
    },
    handleContactPostDelete: (postId: string, contactPostState) => {
      return handleContactPostDelete(dispatch, postId, contactPostState);
    }
  };
};

export default (connect(null, mapDispatchToProps)(ContactPostContainer) : React.AbstractComponent<OwnProps>);