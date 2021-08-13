// @flow
import * as React from "react";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
import { formatDate } from "../../../helpers/dateHelpers";
// styles //
import styles from "./css/postPreview.module.css";

type Props = {
  newsPostData: NewsPostData;
}
export const PostPreview = ({ newsPostData }: Props): React.Node => {
  const { title, createdBy, content, editedAt, createdAt } = newsPostData;


  return (
    <div className={ styles.newsPostPreviewWrapper }>
      <div className={ styles.newsPostPreviewTitle}>
        <span>Title:</span>
        <span className={ styles.newsPostPreviewTitleText}>{ title }</span>
      </div>
      <div className={ styles.newsPostCreatedBy }>
        <span>Author:</span>
        <span className={ styles.newsPostCreatedByText }>{ createdBy }</span>
      </div>
      <div className={ styles.newsPostContentDiv }>
        <div dangerouslySetInnerHTML={{ __html: content }}> 

        </div>
      </div>
      <div className={ styles.newsPostTimeStamps }>
        <div className={ styles.newsPostCreatedAt }>
          <span>Created At:</span>
          <span>{ formatDate(createdAt) }</span>
        </div>
        <div className={ styles.newsPostEditedAt }>
          <span>Edited At:</span>
          <span>{ formatDate(editedAt) }</span>
        </div>
      </div>
    </div>
  );
};