// @flow
import * as React from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import { Card, Dropdown, Form, Grid, Icon, Popup, Radio } from "semantic-ui-react";
// additional components //
import { ContactPostCards } from "./ContactPostCards";
import ContactPostView from "./ContactPostView";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
import ApiMessage from "../shared/ApiMessage";
// redux imports //
import { connect } from "react-redux";
import { handleOpenContactPost, handleCloseContactPost, clearContactPostData, handleContactPostDelete, handleFetchContactPosts, handleContactPostArchive, handleSendContactPostReplyEmail } from "../../../redux/actions/contactPostActions";
import { operationSuccessful, setAppError } from "../../../redux/actions/appGeneralActions";
// flow types //
import type { ContactPostState, ContactPostData, ContactPostAction, FetchContactPostParams } from "../../../redux/reducers/contact_posts/flowTypes";
import type { Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { DropdownItemProps } from "semantic-ui-react";
// style imports //
import styles from "./css/contactPostsIndexContainer.module.css";
// helpers //

const { useEffect, useState } = React;

type OwnProps = {|
  contactPostState: ContactPostState
|};
type Props = {|
  ...OwnProps,
  handleFetchContactPosts: (fetchParams?: FetchContactPostParams) => Promise<boolean>,
  handleCloseContactPost: () => void,
  handleOpenContactPost: (contactPostId: string, contactPostState: ContactPostState) => void,
  handleContactPostDelete: (contactPostId: string, contactPostState: ContactPostState) => Promise<boolean>,
  handleContactPostArchive: (contactPostId: string, archived: boolean, contactPostState: ContactPostState) => Promise<boolean>,
  handleSendContactPostReplyEmail: (data: any) => Promise<boolean>
|};
type LocalState = {
  confirmDeleteModalOpen: boolean,
  viewNewPosts: boolean,
  contactPostIdToDelete: string,
  sortSelection: "asc" | "desc"
}
const ContactPostContainer = (props : Props): React.Node => {
  const { contactPostState } = props;
  // reducer functions //
  const { handleFetchContactPosts, handleOpenContactPost,  handleCloseContactPost, handleContactPostDelete, handleContactPostArchive, handleSendContactPostReplyEmail } = props
  const { createdContactPosts } = contactPostState;
  // local state //
  const [ localState, setLocalState ] = useState<LocalState>({ confirmDeleteModalOpen: false, contactPostIdToDelete: "", viewNewPosts: true, sortSelection: "desc" });
  // load posts on component mount //

  useEffect(() => {
    if (localState.viewNewPosts) {
      // fetch new unarchived posts //
      handleFetchContactPosts({ archived: false, date: localState.sortSelection });
    } else {
      // fetch archived posts //
      handleFetchContactPosts({ archived: true, date: localState.sortSelection })
    }
  },[ localState.viewNewPosts ])

  const openContactPost = (contactPostId: string) => {
    return handleOpenContactPost(contactPostId, contactPostState);
  };
  const deleteContactPost = (contactPostId: string) => {
    return handleContactPostDelete(contactPostId, contactPostState);
  };
  const closeContactPost = () => {
    handleCloseContactPost();
  };
  const sendContactReply = (postId: string, data: any) => {
    return handleSendContactPostReplyEmail(data);
  };
  const handleSortSelect = (_, data: any) => {
    return handleFetchContactPosts({ archived: !localState.viewNewPosts, sort: data.value })
      .then(() => {
        setLocalState({ ...localState, sortSelection: data.value });
      })
  }
  /* archive and hide */
  const handleContactPostArchiveStatus = (postIdToToggle: string) => {
    const { archived } = contactPostState.createdContactPosts.filter((post) => post._id === postIdToToggle)[0];
    return handleContactPostArchive(postIdToToggle, !archived, contactPostState)
      .then(() => {
        console.log("processed");
        return Promise.resolve(true);
      });
  }
  /* delete functionality */
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
  const handleArchiveToggle = (e:any, data: any):void => {
    setLocalState({ ...localState, viewNewPosts: !localState.viewNewPosts });
  }

  return (
    <Grid className={ styles.contactPostsIndexContainer }>
      <ApiMessage currentLocalState={ contactPostState } />
      <ConfirmDeleteModal 
        open={ localState.confirmDeleteModalOpen } 
        modelName="contact" 
        confirmAction={ confirmDeleteContactPost }
        cancelAction={ cancelDeleteAction }
      />
      <Grid.Row>
        <Grid.Column width={ 6 } className={ styles.postsCardsColumn }>
          <div className={ `${styles.archivePostsToggle} ${ localState.viewNewPosts ? styles.activeBg : styles.archiveBg }`}>
            <span>
              <Popup 
                content={ `${ localState.viewNewPosts ? "View archived messages" : "View new messages"}`}
                trigger={
                  <Radio 
                  toggle 
                  checked={ localState.viewNewPosts }
                  onClick={ handleArchiveToggle } />
                }
              />
            </span>
            <span>{`${localState.viewNewPosts ? "New and Unread" : "Archived"}`}</span>
            <span>
              <Dropdown labeled text={ `${ localState.sortSelection === "asc" ? "Oldest" : "Newest"}` }>
                <Dropdown.Menu>
                  <Dropdown.Item content="Newest First" value="desc" onClick={ handleSortSelect } />
                  <Dropdown.Item content="Oldest First" value="asc" onClick={ handleSortSelect } />
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
          <div className={ styles.postsColumnInner }>
            <ContactPostCards 
              contactPostState={ contactPostState } 
              openContactPost={ openContactPost }
              handleContactPostArchiveStatus={ handleContactPostArchiveStatus }
              triggerContactPostDelete={ triggerContactPostDelete } />
          </div>
        </Grid.Column>
        <Grid.Column width={ 10 } className={ styles.postsViewColumn }>  
          <ContactPostView 
            contactPost={ contactPostState.contactPostData } 
            handleClosePost={ closeContactPost }
            handleContactPostArchiveStatus = { handleContactPostArchiveStatus }
            sendContactReply={ sendContactReply }
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>        
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ContactPostAction>) => {
  return {
    handleFetchContactPosts: (fetchParams?: FetchContactPostParams) => {
      return handleFetchContactPosts(dispatch, fetchParams);
    },
    handleOpenContactPost: (postId: string, contactPostState: ContactPostState) => {
      return handleOpenContactPost(dispatch, postId, contactPostState);
    },
    handleCloseContactPost: () => {
      return handleCloseContactPost(dispatch);
    },
    handleContactPostDelete: (postId: string, contactPostState: ContactPostState) => {
      return handleContactPostDelete(dispatch, postId, contactPostState);
    },
    handleContactPostArchive: (postId: string, archive: boolean, contactPostState: ContactPostState) => {
      return handleContactPostArchive(dispatch, { postId, archive }, contactPostState);
    },
    handleSendContactPostReplyEmail: (replyData: any) => {
      return handleSendContactPostReplyEmail(dispatch, replyData);
    }
  };
};

export default (connect(null, mapDispatchToProps)(ContactPostContainer) : React.AbstractComponent<OwnProps>);