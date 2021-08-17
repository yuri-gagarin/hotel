// @flow 
import * as React from "react";
// styles //
import styles from "./css/newsPostMainCard.module.css";
import type { NewsPostData } from "../../../redux/reducers/news_posts/flowTypes";

type Props = {
  newsPostData: NewsPostData;
};

export const NewsPostMainCard = ({ newsPostData }: Props): React.Node => {

  React.useEffect(() => {
    console.log("loaded");
  }, []);
  
  return (
    <div className={ styles.postCardWrapper }>
      <div className={ styles.newsPostsHeader }></div>
      <div className={ styles.newsPostsLeftContainer }></div>
      <div className={ styles.newsPostsRightContainer }></div>
    </div>
  );
};

