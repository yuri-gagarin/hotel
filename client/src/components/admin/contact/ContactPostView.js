// @flow 
import * as React from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import { Container, Button, Popup, Segment, FormInput, Icon } from "semantic-ui-react";
// additional components //
import { ContactPostReplyModal } from "./ContactPostReplyModal";
import { ContactPostReplyMarkup } from "./ContactPostReplyMarkup";
// flow types //
import type { ContactPostData, AdminContactPostReplyData } from "../../../redux/reducers/contact_posts/flowTypes";
// style imports //
import styles from "./css/contactPostViewStyles.module.css";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";
import { formatDate }  from "../../helpers/dateHelpers";

type Props = {
  contactPost: ContactPostData,
  handleClosePost: () => void,
  handleMarkReadUnread: (contactPostId: string) => Promise<boolean>,
  handleContactPostArchiveStatus: (contactPostId: string) => Promise<boolean>,
  sendContactReply: (data: AdminContactPostReplyData) => Promise<boolean> 
}
type LocalState = {
  replyModalOpen: boolean,
}

const ContactPostView = ({ contactPost, handleClosePost, handleMarkReadUnread, sendContactReply, handleContactPostArchiveStatus } : Props): React.Node => {
  const { useState, useEffect } = React;
  const [ localState, setLocalState ] = useState<LocalState>({ replyModalOpen: false });

  const toggleReplyModal = () => {
    setLocalState({ ...localState, replyModalOpen: !localState.replyModalOpen });
  };

  const triggerAutoResponse = () => {
    /** TODO  
     * this should trigger the response modal with email as default
     * implement after response action is tested
    */
  }
  const handleDeletePost = () => {

  };

  if (!objectValuesEmpty(contactPost)) {
    return (
      <Segment className={ styles.contactPostViewSegment }>
        <ContactPostReplyModal 
          replyModalOpen= { localState.replyModalOpen }
          contactPostData= { contactPost }
          handleCloseModal= { toggleReplyModal }
          sendContactReply= { sendContactReply }
        />
        <div className={ styles.messageControlsDiv }>
          <Button.Group>
            <Button content="Write Reply" icon="reply" positive onClick={ toggleReplyModal } />
            <Button content="Close" icon="cancel" color="grey" onClick={ handleClosePost } />
          </Button.Group>
          <Button 
            basic 
            icon="envelope open" 
            color="blue" 
            content={ contactPost.read ? "Mark as Unread" : "Mark as Read" } 
            onClick={ () => handleMarkReadUnread(contactPost._id) } 
          />
          <Button.Group>
            {
              contactPost.archived 
              ?
              <Popup 
                content="Restore message"
                trigger={
                  <Button icon="archive" content="Restore" color="blue" onClick={ () => handleContactPostArchiveStatus(contactPost._id) } />
                }   
              />
              :
              <Popup 
                content="Archive message. Will NOT delete"
                trigger={
                  <Button icon="archive" content="Archive" color="orange" onClick={ () => handleContactPostArchiveStatus(contactPost._id) } />
                }
              />
            }
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
            <span>Message from:</span><span>{contactPost.name}</span>
          </div>
          <div className={ styles.contactPostMessageInfo }>  
            <i className="fas fa-envelope-square" ></i>            
            <span>Email:</span><span className={ styles.emailSpan } onClick={ triggerAutoResponse }>{contactPost.email}</span>
          </div>
          <div className={ styles.contactPostMessageInfo }>
            <i className="fas fa-phone-square" ></i>
            <span>Phone:</span><span>{contactPost.phoneNumber || "No phone number given"}</span>
          </div>
          <div className={ styles.contactPostMessageInfo }>
            <i className="far fa-calendar-alt"></i>           
            <span>Sent at:</span><span>{formatDate(contactPost.sentAt, { military: true }) || "Can't resolve date"}</span>
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
          {
            contactPost.replyContent 
            ?  <ContactPostReplyMarkup rawHTMLString={contactPost.replyContent} />
            : null
          }
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
