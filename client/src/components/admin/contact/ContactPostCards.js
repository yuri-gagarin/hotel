// @flow 
import * as React from "react";
// semantic ui comps //
import { Button, Card, Icon, Popup } from "semantic-ui-react";
import { CardInfo } from "./CardInfo";
// types //
import type { ContactPostState, ContactPostData } from "../../../redux/reducers/contact_posts/flowTypes";
// styles and css //
import styles from "./css/contactPostCards.module.css";
// helpers //
import { formatDate } from "../../helpers/dateHelpers";
import { trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  contactPostState: ContactPostState,
  openContactPost: (contactPostId: string) => void,
  handleContactPostArchiveStatus: (contactPostId: string) => Promise<boolean>,
  triggerContactPostDelete: (contactPostId: string) => void,
};

export const ContactPostCards = ({ contactPostState, openContactPost, handleContactPostArchiveStatus, triggerContactPostDelete }: Props): React.Node => {
  const { contactPostData, createdContactPosts } = contactPostState;
  // local state and effect hooks //

  return (
    <Card.Group style={{ width: "100%" }}>
      {
        contactPostState.createdContactPosts.map((post) => {
          return (
            <Card className={ `${styles.contactPostCard} ${ post._id === contactPostData._id ? styles.contactPostCardActive : "" } ${ post.archived ? styles.contactPostCardArchived : "" }` } key={ post._id } fluid > 
              <CardInfo read={ post.read } replied={ ( post.replyContent ? true : false ) } />
              <Card.Content>
                <Card.Header className={ styles.cardHeader } textAlign="left">
                  <div className={ styles.cardHeaderFrom }>
                    <span><i className="fas fa-user" /></span><span>{ post.name }</span>
                  </div>
                  <div className={ styles.cardHeaderEmail }>
                    <span><i className="fas fa-envelope" /></span><span>{ post.email }</span>
                  </div>
                </Card.Header>
                <Card.Meta className={ styles.cardMeta }>
                  <div className={ styles.cardSentTime }>
                    <span><i className="far fa-calendar-alt" /></span>
                    <span>Received At: {formatDate(post.createdAt, { military: true })} </span>
                  </div>
                </Card.Meta>
                <Card.Description className={ styles.cardDescription }>
                  <div className={ styles.descriptionHeader}>Content:</div>
                  <div className={ styles.descriptionContentText }>
                    { trimStringToSpecificLength(post.content, 25) }
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content className={ styles.cardControls } extra>
                  {
                    post._id === contactPostData._id 
                    ? 
                      <div className={ styles.cardActiveDiv }>  
                        <i className="fas fa-angle-double-right"></i>                      
                      </div>
                    :
                    <div className={ styles.cardButtonsDiv }>
                      <Button.Group>
                        <Button color="green" icon labelPosition="right"  onClick={() => openContactPost(post._id) }>
                          <Icon name="right arrow" />
                          Open
                        </Button>
                      </Button.Group>
                      <Button.Group>
                        {
                          post.archived 
                          ?
                          <Popup 
                          content="Restore to active"
                          trigger={
                            <Button color="blue" icon="plus" content="Restore" onClick={() => handleContactPostArchiveStatus(post._id)} />
                          }
                          />
                          :
                          <Popup 
                          content="Mark as read and archive"
                          trigger={
                            <Button color="orange" icon="archive" content="Archive" onClick={() => handleContactPostArchiveStatus(post._id)} />
                          }
                          />
                        }
                        <Popup 
                          content="Delete the client contact request"
                          trigger={
                            <Button color='red' icon="trash" content="Delete" onClick={() => triggerContactPostDelete(post._id)} />
                          }
                        />
                      </Button.Group>
                     
                    </div>
                  }
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  )
}