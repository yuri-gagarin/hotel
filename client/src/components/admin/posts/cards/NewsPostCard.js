// @flow
import * as React from "react";
import { Button, Segment } from "semantic-ui-react";
// styles //
import styles from "./css/newsPostCard.module.css";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";
import { trimStringToSpecificLength } from "../../../helpers/displayHelpers";

type Props = {
  newsPostData: NewsPostData;
  toggleNewsPost: (newsPostId: string) => void;
}
export const NewsPostCard = ({ newsPostData, toggleNewsPost }: Props): React.Node => {

  return (
    <Segment>
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
      <Button.Group className={ styles.controlBtns }>
        <Button inverted color="green" onClick={ () => toggleNewsPost(newsPostData._id) }>View</Button>
        <Button inverted color="red">Delete</Button>
      </Button.Group>
    </Segment>
  )
}