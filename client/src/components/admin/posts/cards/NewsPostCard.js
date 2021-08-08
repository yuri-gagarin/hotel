// @flow
import * as React from "react";
import { Button, Segment } from "semantic-ui-react";
// styles //
import styles from "./css/newsPostCard.module.css";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";

type Props = {
  newsPostData: NewsPostData;
  toggleNewsPost: (newsPostId: string) => void;
}
export const NewsPostCard = ({ newsPostData, toggleNewsPost }: Props): React.Node => {

  return (
    <Segment>
      <div className={ styles.titleDiv}>{ newsPostData.title}</div>
      <div className={ styles.contentDiv }>{ newsPostData.content }</div>
      <div className={ styles.timeStampsDiv }>
        <span>{ newsPostData.createdAt }</span>
        <span>{ newsPostData.editedAt }</span>
      </div>
      <Button.Group>
        <Button inverted color="green" onClick={ () => toggleNewsPost(newsPostData._id) }>View</Button>
        <Button inverted color="red">Delete</Button>
      </Button.Group>
    </Segment>
  )
}