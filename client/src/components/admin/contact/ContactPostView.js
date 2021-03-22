// @flow 
import * as React from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import { Container, Button, Popup, Segment, FormInput, Icon } from "semantic-ui-react";
// additional components //
import { ContactPostReplyModal } from "./ContactPostReplyModal";
// flow types //
import type { ContactPostData } from "../../../redux/reducers/contact_posts/flowTypes";
// style imports //
import styles from "./css/contactPostViewStyles.module.css";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";
import { formatDate }  from "../../helpers/dateHelpers";

const setInitialMessage = () => {
  return (
    `
    <p>your response ... </p>
    `
  );
}
type Props = {
  contactPost: ContactPostData,
  handleClosePost: () => void,
  sendContactReply: () => void // this will be vastly different
}
type LocalState = {
  replyModalOpen: boolean,
}

const ContactPostView = ({ contactPost, handleClosePost, sendContactReply } : Props): React.Node => {
  const { useState, useEffect } = React;
  const [ localState, setLocalState ] = useState<LocalState>({ replyModalOpen: true });

  const handleSend = () => {
    sendContactReply();
  };
  const toggleReplyModal = () => {
    setLocalState({ ...localState, replyModalOpen: !localState.replyModalOpen });
  };
  const handleArchivePost = () => {

  };
  const handleDeletePost = () => {

  };

  if (!objectValuesEmpty(contactPost)) {
    return (
      <Segment className={ styles.contactPostViewSegment }>
        <ContactPostReplyModal 
          replyModalOpen= { localState.replyModalOpen }
          contactPostData= { contactPost }
          handleCloseModal= { toggleReplyModal }
          sendContactReply= { handleSend }
        />
        <div className={ styles.messageControlsDiv }>
          <Button.Group>
            <Button content="Reply" positive onClick={ toggleReplyModal } />
            <Button content="Close" color="grey" onClick={ handleClosePost } />
            <Popup 
              content="Archive message. Will NOT delete"
              trigger={
                <Button icon="archive" content="Archive" color="orange" onClick={ handleArchivePost } />
              }
            />
            <Popup 
              content="Delete Message"
              trigger={
                <Button icon="trash" content="Delete" color="red" onClick={ handleDeletePost } />
              }
            />
          </Button.Group>
        </div>
        <div className={ styles.contactPostMessageInfoDiv }>
          <div className={ styles.contactPostMessageInfo }>
            <i className="fas fa-sticky-note"></i>
            <span>Message from: {contactPost.name}</span>
          </div>
          <div className={ styles.contactPostMessageInfo }>  
            <i className="fas fa-envelope-square" ></i>            
            <span>Email: </span><a href="#" style={{color: "blue"}}>{contactPost.email}</a>
          </div>
          <div className={ styles.contactPostMessageInfo }>
            <i className="fas fa-phone-square" ></i>
            <span>Phone: { contactPost.phoneNumber || "No phone number given"} </span>
          </div>
          <div className={ styles.contactPostMessageInfo }>
            <i className="far fa-calendar-alt"></i>           
            <span>Sent at: { formatDate(contactPost.sentAt, { military: true }) || "Can't resolve date" } </span>
          </div>
        </div>
        <div className={ styles.messageContentDiv }>
          <div className={ styles.messageContentHeader}>
            <span>{contactPost.name}</span><span>wrote:</span>
          </div>
          <div className={ styles.messageContent }>
            { contactPost.content }
          </div>
          <div className={ styles.messageContentMeta }>
            <span>received at: { formatDate(contactPost.createdAt, { military: true }) }</span>
            <span>replied: { formatDate(contactPost.repliedAt, { military: true }) }</span>
          </div>
        </div>
      </Segment>  
    )
  } else {
    return (
      <Segment className={ styles.contactPostEmptyViewSegment }>
        <Icon size="huge" name="mail square" color="blue" />
        <span>Open a message to view its contents...</span>
      </Segment>
    );
  }
};

export default ContactPostView;
