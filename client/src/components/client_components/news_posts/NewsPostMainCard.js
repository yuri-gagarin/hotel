// @flow 
import * as React from "react";
import { useHistory } from "react-router-dom"
// type imports //
import type { NewsPostData } from "../../../redux/reducers/news_posts/flowTypes";
// styles //
import styles from "./css/newsPostMainCard.module.css";
// helpers //
import { trimStringToSpecificLength, removeHTMLTagsFromString } from "../../helpers/displayHelpers";
import { formatDate } from "../../helpers/dateHelpers";


type Props = {
  newsPostData: NewsPostData;
  handleGoToNewsPostReader: (postId: string) => void;
};

export const NewsPostMainCard = ({ newsPostData, handleGoToNewsPostReader }: Props): React.Node => {
  const history = useHistory();
  return (
    <div className={ styles.postCardWrapper }>
      <div className={ styles.newsPostsCardAuthor }>
        <span>Written by:</span>
        <span>{ newsPostData.createdBy }</span>
        <i className="fas fa-user"></i>      
      </div>
      <div className={ styles.newsPostsCardUpper }>
        <div className={ styles.newsPostsLogoDiv }>
          <i className="fas fa-th-large"></i>
        </div>
        <div className={ styles.newsPostsImagesDiv }>
          <div className={ styles.imageDiv} >
            <img src="/assets/images/roomStock3.jpeg"></img>
          </div>
          <div className={ styles.imageDiv} >
            <img src="/assets/images/roomStock3.jpeg"></img>
          </div>
        </div>
      </div>
      <div className={ styles.newsPostsCardLower }>
        <div className={ styles.mainCardTitleDiv}>
          { newsPostData.title }
        </div>
        <div className={ styles.mainCardContentDiv }>
          { trimStringToSpecificLength(removeHTMLTagsFromString(newsPostData.content), 225)}
          <span className={ styles.readMoreBtn } onClick={ () => handleGoToNewsPostReader(newsPostData._id) }>Read...</span>
        </div>
        <div className={ styles.mainCardTimeStampsDiv }>
          <div className={ styles.mainCardCreatedAt }>
            <span>Posted at:</span>
            <span>{ formatDate(newsPostData.createdAt) }</span>
          </div>
          <div className={ styles.mainCardEditedAt }>
            <span>Updated at:</span>
            <span>{ formatDate(newsPostData.editedAt) }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

