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
  handleGoBack: () => void;
  handleGoToPreviousNewsPost: (currentPostId: string) => void;
  handleGoToNextNewsPost: (currentPostId: string) => void;
};

export const NewsPostReader = ({ newsPostData, handleGoBack, handleGoToPreviousNewsPost, handleGoToNextNewsPost }: Props): React.Node => {
  const { _id: postId, title, createdBy, content, editedAt } = newsPostData;
  React.useEffect(() => {
    console.log("loaded reader here")
  }, []);

  return (
    <div className={ styles.newsPostReaderWrapper }>
      <div className={ styles.readerControls }>
        <Button basic color="blue" icon="arrow left" content="Back" onClick={ handleGoBack } />
        <Button.Group>
          <Button basic icon labelPosition="left" color="green" onClick={ () => handleGoToPreviousNewsPost(postId) }>
            Previous
            <Icon name="caret left" />
          </Button>
          <Button basic icon labelPosition="right" color="green" onClick={ () => handleGoToNextNewsPost(postId) }> 
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
        <div className={ styles.readerContentInner }>
          <div className={ styles.readerPicsColumn }>
            <div className={ styles.readerImgDiv }>
              <img src="/assets/images/roomStock3.jpeg"></img>
            </div>
            <div className={ styles.readerImgDiv }>
              <img src="/assets/images/roomStock3.jpeg"></img>
            </div>
            <div className={ styles.readerImgDiv }>
              <img src="/assets/images/roomStock3.jpeg"></img>
            </div>
            <div className={ styles.readerImgDiv }>
              <img src="/assets/images/roomStock3.jpeg"></img>
            </div>
            <div className={ styles.readerImgDiv }>
              <img src="/assets/images/roomStock3.jpeg"></img>
            </div>
          </div>
          <div className={ styles.readerTextColumn }>
            <div className={ styles.readerInnerText} dangerouslySetInnerHTML={{ __html: content }}>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
};