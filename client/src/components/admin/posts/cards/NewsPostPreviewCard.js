// @flow
import * as React from "react";
import { Button, Segment } from "semantic-ui-react";
// styles //
import styles from "./css/newsPostPreviewCard.module.css";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";

type Props = {
  newsPostData: NewsPostData;
}
export const NewsPostPreviewCard = ({ newsPostData }: Props): React.Node => {

  return (
    <Segment style={{ height: "100%", width: "100&" }}>
      <div className={ styles.controlsRow }>
        <Button.Group>
          <Button inverted color="blue">Close</Button>
          <Button inverted color="orange">Edit</Button>
          <Button color="red">Delete</Button>
        </Button.Group>
      </div>
      <div className={ styles.titleDiv}>{ newsPostData.title}</div>
      <div className={ styles.timeStampsDiv }>
        <span>{ newsPostData.createdAt }</span>
        <span>{ newsPostData.editedAt }</span>
      </div>
    </Segment>
  )
}