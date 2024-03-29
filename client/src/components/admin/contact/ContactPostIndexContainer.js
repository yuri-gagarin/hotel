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
import {
  handleOpenContactPost, handleCloseContactPost, clearContactPostData,
  handleUpdateContactPost, handleContactPostDelete, handleFetchContactPosts, handleSendContactPostReplyEmail, updateContactPost 
  } from "../../../redux/actions/contactPostActions";
import { operationSuccessful, setAppError } from "../../../redux/actions/appGeneralActions";
// flow types //
import type { ContactPostState, ContactPostData, ContactPostAction, FetchContactPostParams, AdminContactPostReplyData, ContactPostUpdateData } from "../../../redux/reducers/contact_posts/flowTypes";
import type { Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { DropdownItemProps } from "semantic-ui-react";
// style imports //
import styles from "./css/contactPostsIndexContainer.module.css";
import { capitalizeString } from "../../helpers/displayHelpers";
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
  handleUpdateContactPost: (updateData: ContactPostUpdateData, contactPostState: ContactPostState) => Promise<boolean>,
  handleContactPostDelete: (contactPostId: string, contactPostState: ContactPostState) => Promise<boolean>,
  handleSendContactPostReplyEmail: (data: AdminContactPostReplyData) => Promise<boolean>
|};
type LocalState = {
  confirmDeleteModalOpen: boolean,
  viewNewPosts: boolean,
  contactPostIdToDelete: string,
  sortSelection: "asc" | "desc",
  readUnreadFilterSelection: string
}
const ContactPostContainer = (props : Props): React.Node => {
  const { contactPostState } = props;
  // reducer functions //
  const { handleFetchContactPosts, handleOpenContactPost,  handleCloseContactPost, handleUpdateContactPost, handleContactPostDelete, handleSendContactPostReplyEmail } = props
  const { createdContactPosts } = contactPostState;
  // local state //
  const [ localState, setLocalState ] = useState<LocalState>({ confirmDeleteModalOpen: false, contactPostIdToDelete: "", viewNewPosts: true, sortSelection: "desc", readUnreadFilterSelection: "View all" });
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
  const sendContactReply = (data: AdminContactPostReplyData) => {
    return handleSendContactPostReplyEmail(data)
      .then(() => {
        const updateData: ContactPostUpdateData = { postId: data.postId, replied: true, read: true, replyContent: data.replyContent };
        return handleUpdateContactPost(updateData, contactPostState);
      })
  };
  const handleSortSelect = (_, data: any) => {
    return handleFetchContactPosts({ archived: !localState.viewNewPosts, sort: data.value })
      .then(() => {
        setLocalState({ ...localState, sortSelection: data.value });
      })
  };
  const handleReadUnreadFilter = (_, data: any) => {
    return handleFetchContactPosts({ archived: !localState.viewNewPosts, readSort: data.value })
      .then(() => {
        setLocalState({ ...localState, readUnreadFilterSelection: capitalizeString(data.value) });
      });
  }
  /* archive and hide */
  const handleContactPostArchiveStatus = (postIdToToggle: string) => {
    const { archived } = contactPostState.createdContactPosts.filter((post) => post._id === postIdToToggle)[0];
    return handleUpdateContactPost({ postId: postIdToToggle, archived: !archived }, contactPostState);
  };
  /* mark as read on unread */
  const toggleContactPostReadUnread = (postIdToMark: string) => {
    const contactPost = contactPostState.createdContactPosts.filter((post) => post._id === postIdToMark)[0];
    return handleUpdateContactPost({ postId: postIdToMark, read: !contactPost.read }, contactPostState);
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
            <span>{`${localState.viewNewPosts ? "Active" : "Archived"}`}</span>
            <span>
              <Dropdown className={ styles.dropdownBtn } button labeled text={ `${ localState.sortSelection === "asc" ? "Oldest" : "Newest"}` }>
                <Dropdown.Menu>
                  <Dropdown.Item content="Newest First" value="desc" onClick={ handleSortSelect } />
                  <Dropdown.Item content="Oldest First" value="asc" onClick={ handleSortSelect } />
                </Dropdown.Menu>
              </Dropdown>
            </span>
            <span>
              <Dropdown className={ styles.dropdownBtn } button labeled text={ localState.readUnreadFilterSelection }>
                <Dropdown.Menu>
                  <Dropdown.Item content="Unread" value="unread" onClick={ handleReadUnreadFilter } />
                  <Dropdown.Item content="Read" value="read" onClick={ handleReadUnreadFilter } />
                  <Dropdown.Divider />
                  <Dropdown.Item content="View All" value="view all" onClick={ handleReadUnreadFilter } />
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
            handleMarkReadUnread= { toggleContactPostReadUnread }
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
    handleUpdateContactPost: (updateData: ContactPostUpdateData, contactPostState: ContactPostState) => {
      return handleUpdateContactPost(dispatch, updateData, contactPostState);
    },
    handleContactPostDelete: (postId: string, contactPostState: ContactPostState) => {
      return handleContactPostDelete(dispatch, postId, contactPostState);
    },
    handleSendContactPostReplyEmail: (replyData: AdminContactPostReplyData) => {
      return handleSendContactPostReplyEmail(dispatch, replyData);
    }
  };
};

export default (connect(null, mapDispatchToProps)(ContactPostContainer) : React.AbstractComponent<OwnProps>);