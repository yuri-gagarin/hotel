// @flow 
import * as React from "react";
// semantic ui comps //
import { Button, Card, Icon } from "semantic-ui-react";
// types //
import type { ContactPostData } from "../../../redux/reducers/contact_posts/flowTypes";
// styles and css //
import styles from "./css/contactPostCards.module.css";
// helpers //
import { formatDate } from "../../helpers/dateHelpers";
import { trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  createdContactPosts: Array<ContactPostData>,
  openContactPost: (contactPostId: string) => void,
  triggerContactPostDelete: (contactPostId: string) => void,
}
export const ContactPostCards = ({ createdContactPosts, openContactPost, triggerContactPostDelete }: Props): React.Node => {
  return (
    <Card.Group>
      {
        createdContactPosts.map((post) => {
          return (
            <Card key={ post._id } fluid color="green"> 
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
                  <span><i class="far fa-calendar-alt" /></span>
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
                  <Button basic color='green' onClick={() => openContactPost(post._id)}>
                    Open
                  </Button>
                  <Button basic color='red' onClick={() => triggerContactPostDelete(post._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  )
}