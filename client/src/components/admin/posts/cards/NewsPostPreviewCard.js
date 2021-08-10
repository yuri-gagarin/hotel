// @flow
import * as React from "react";
import { Button, Segment } from "semantic-ui-react";
// styles //
import styles from "./css/newsPostPreviewCard.module.css";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpes //
import { formatDate } from "../../../helpers/dateHelpers";

type Props = {
  newsPostData: NewsPostData;
  closeCurrentNewsPost: () => void;
  handleOpenEditCurrentNewsPost: () => void;
  triggerDeleteCurrentNewsPost: () => void;
}
export const NewsPostPreviewCard = ({ newsPostData, closeCurrentNewsPost, handleOpenEditCurrentNewsPost, triggerDeleteCurrentNewsPost }: Props): React.Node => {

  return (
    <Segment style={{ height: "100%", width: "100%" }}>
      <div className={ styles.controlsRow }>
        <Button.Group>
          <Button inverted color="blue" onClick={ closeCurrentNewsPost }>Close</Button>
          <Button inverted color="orange" onClick={ handleOpenEditCurrentNewsPost }>Edit</Button>
          <Button color="red" onClick={ triggerDeleteCurrentNewsPost }>Delete</Button>
        </Button.Group>
      </div>
      <div className={ styles.titleDiv }>
        <span>Title:</span>
        <div>{newsPostData.title}</div>
      </div>
      <div className={ styles.contentDiv }>
        <div dangerouslySetInnerHTML={{__html: newsPostData.content }}></div>
      </div>
      <div className={ styles.timeStampsDiv }>
        <div className={ styles.createdAtDiv }>
          <span>Created At:</span>
          <span>{ formatDate(newsPostData.createdAt) }</span>
        </div>
        <div className={ styles.editedAtDiv }>
          <span>Edited At:</span>
          <span>{ formatDate(newsPostData.editedAt) }</span>
        </div>
      </div>
    </Segment>
  );
};
