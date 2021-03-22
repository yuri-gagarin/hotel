// @flow 
import * as React from "react";
// semantic ui comps //
import { Button, Card, Icon } from "semantic-ui-react";
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
  archiveContactPost: (contactPostId: string) => Promise<boolean>,
  triggerContactPostDelete: (contactPostId: string) => void,
};

export const ContactPostCards = ({ contactPostState, openContactPost, archiveContactPost, triggerContactPostDelete }: Props): React.Node => {
  const { contactPostData, createdContactPosts } = contactPostState;
  // local state and effect hooks //

  return (
    <Card.Group>
      {
        contactPostState.createdContactPosts.map((post) => {
          return (
            <Card className={ `${styles.contactPostCard} ${ post._id === contactPostData._id ? styles.contactPostCardActive : "" }` } key={ post._id } fluid > 
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
              <Card.Content extra>
                <div className='ui two buttons'>
                  {
                    post._id === contactPostData._id 
                    ? <Button color="orange" icon="archive" content="Archive" onClick={() => archiveContactPost(post._id)} />
                    : <Button basic color="green" icon="file" content="Open" onClick={() => openContactPost(post._id)} />
                  }
                  <Button color='red' icon="trash" content="Delete" onClick={() => triggerContactPostDelete(post._id)} />
                </div>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  )
}