// @flow
import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
// types //
import type { NewsPostData } from "../../../redux/reducers/news_posts/flowTypes";
import { formatDate } from "../../helpers/dateHelpers";
// styles //
import styles from "./css/newsPostReader.module.css";

type Props = {
  newsPostData: NewsPostData;
};

export const NewsPostReader = ({ newsPostData }: Props): React.Node => {
  const { title, createdBy, content, editedAt } = newsPostData;
  React.useEffect(() => {
    console.log("loaded reader here")
  }, []);

  return (
    <div className={ styles.newsPostReaderWrapper }>
      <div className={ styles.readerControls }>
        <Button basic color="blue" icon="arrow left" content="Back" />
        <Button.Group>
          <Button basic icon labelPosition="left" color="green">
            Previous
            <Icon name="caret left" />
          </Button>
          <Button basic icon labelPosition="right" color="green"> 
            Next
            <Icon name="caret right" />
          </Button>
        </Button.Group>
      </div>
      <div className={ styles.readerContent}>
        <div className={ styles.contentTitle }>{ title }</div>
        <div className={ styles.contentDetails }>
          <div className={ styles.contentAuthor }>
            <span>Written by: </span>
            <span>{ createdBy }</span>
            <span></span>
          </div>
          <div className={ styles.contentTimestamps }>
            <span>Posted: </span>
            <span>{ formatDate(editedAt)} </span>
          </div>
        </div>
        <div className={ styles.readerContentinner } dangerouslySetInnerHTML={{ __html: content }}>

        </div>
      </div>
    </div>
  )
};