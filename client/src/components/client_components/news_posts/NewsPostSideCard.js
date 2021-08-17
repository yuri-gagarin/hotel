// @flow 
import * as React from "react";
// styles //
import styles from "./css/newsPostSideCard.module.css";
import type { NewsPostData } from "../../../redux/reducers/news_posts/flowTypes";
// helpers //
import { formatDate } from "../../helpers/dateHelpers";
import { trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  newsPostData: NewsPostData;
};

export const NewsPostSideCard = ({ newsPostData }: Props): React.Node => {

  React.useEffect(() => {
    console.log("loaded");
  }, []);
  
  return (
    <div className={ styles.sideCardWrapper }>
      <div className={ styles.sideCardTimeStamps }>
        <span>Posted: </span>
        <span>{ formatDate(newsPostData.createdAt) }</span>
      </div>
      <div className={ styles.sideCardUpper }>
        <img className={ styles.sideCardImg } src="/assets/images/roomStock3.jpeg"></img>
      </div>
      <div className={ styles.sideCardLower }>
        <div className={ styles.sideCardAuthor }>
          <span>Written by:</span>
          <span>{ newsPostData.createdBy }</span>
          <i className={ `far fa-user ${styles.userIcon}` }></i>        
        </div>
        <div className={ styles.sideCardTitle }>{ trimStringToSpecificLength(newsPostData.title, 69) }</div>
      </div>
    </div>
  );
};

