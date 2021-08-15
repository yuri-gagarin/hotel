// @flow
import * as React from "react";
import { Button, Segment } from "semantic-ui-react";
// aditional components //
import { CardOnlineStatusBlinkers } from "../../shared/CardOnlineStatusBlinkers";
// styles //
import styles from "./css/newsPostCard.module.css";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";
import { trimStringToSpecificLength } from "../../../helpers/displayHelpers";

type Props = {
  active: boolean;
  newsPostData: NewsPostData;
  toggleNewsPost: (newsPostId: string) => void;
}
export const NewsPostCard = ({ active, newsPostData, toggleNewsPost }: Props): React.Node => {
  return (
    <Segment className={`${active ? styles.activeCard : ""}`}>
      <div className={ styles.titleDiv}>
        <span>Title:</span>
        <div>{newsPostData.title}</div>
      </div>
      <div className={ styles.contentDiv }>
        <p>{ trimStringToSpecificLength(newsPostData.content.replace(/<\/?[^>]+(>|$)/g, ""), 69)}</p>
      </div>
      <div className={ styles.timeStampsDiv }>
        <div className={ styles.postCreatedAt} >
          <span>Created at:</span>
          <span>{formatDate(newsPostData.createdAt)}</span>
        </div>
        <div className={ styles.postEditedAt}> 
          <span>Edited at:</span>
          <span>{formatDate(newsPostData.editedAt)}</span>
        </div>
      </div>
      <div className={ styles.postOnlineBlinker }> 
        <CardOnlineStatusBlinkers live={ newsPostData.live } />
      </div>
      <Button.Group className={ styles.controlBtns }>
        <Button inverted color="green" onClick={ () => toggleNewsPost(newsPostData._id) }>View</Button>
        <Button inverted color="red">Delete</Button>
      </Button.Group>
    </Segment>
  )
}