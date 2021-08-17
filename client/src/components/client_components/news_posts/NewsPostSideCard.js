// @flow 
import * as React from "react";
// styles //
import styles from "./css/newsPostSideCard.module.css";
import type { NewsPostData } from "../../../redux/reducers/news_posts/flowTypes";
// helpers //
import { formatDate } from "../../helpers/dateHelpers";
import { trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  active: boolean;
  newsPostData: NewsPostData;
  handleSelectNewsPost: (postId: string) => void;
};

export const NewsPostSideCard = ({ active, newsPostData, handleSelectNewsPost }: Props): React.Node => {
  const { _id: postId, createdAt, createdBy, title } = newsPostData;

  return (
    <div className={ `${styles.sideCardWrapper} ${active ? styles.activeStyle : ""}` } onClick={ () => handleSelectNewsPost(postId) }>
      <div className={ styles.sideCardTimeStamps }>
        <span>Posted: </span>
        <span>{ formatDate(createdAt) }</span>
      </div>
      <div className={ styles.sideCardUpper }>
        <img className={ styles.sideCardImg } src="/assets/images/roomStock3.jpeg"></img>
      </div>
      <div className={ styles.sideCardLower }>
        <div className={ styles.sideCardAuthor }>
          <span>Written by:</span>
          <span>{ createdBy }</span>
          <i className={ `far fa-user ${styles.userIcon}` }></i>        
        </div>
        <div className={ styles.sideCardTitle }>{ trimStringToSpecificLength(title, 69) }</div>
      </div>
    </div>
  );
};

