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
  handleGoToPreviousNewsPost: (postId: string) => void;
  handleGoToNextNewsPost: (postId: string) => void
};

export const NewsPostMainCard = ({ newsPostData, handleGoToNewsPostReader, handleGoToPreviousNewsPost, handleGoToNextNewsPost }: Props): React.Node => {
  const { _id: postId, createdBy, title, content, editedAt, createdAt } = newsPostData;
  // local state for transition //
  const [ transitionState, setTransitionState ] = React.useState<{ transition: boolean }>({ transition: false });

  const goToPreviousPostWithEffect = (): void => {
    setTransitionState({  transition: true });
    setTimeout(() => handleGoToPreviousNewsPost(postId), 500);
   
  };
  const goToNextPostWithEffect = (): void => {
    setTransitionState({  transition: true });
    setTimeout(() => handleGoToNextNewsPost(postId), 500);
  };

  React.useEffect(() => {
    if (transitionState.transition) {
      setTimeout(() => setTransitionState({ transition: false }), 1000);
    }
  }, [ transitionState ]);

  return (
    <div className={ `${styles.postCardWrapper} ${transitionState.transition ? styles.transitionAnimation : ""}` } >
      <div className={ styles.newsPostsCardAuthor }>
        <span>Written by:</span>
        <span>{ createdBy }</span>
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
          { title }
        </div>
        <div className={ styles.mainCardContentDiv }>
          { trimStringToSpecificLength(removeHTMLTagsFromString(content), 225)}
          <span className={ styles.readMoreBtn } onClick={ () => handleGoToNewsPostReader(postId) }>Read...</span>
        </div>
        <div className={ styles.mainCardTimeStampsDiv }>
          <div className={ styles.mainCardCreatedAt }>
            <span>Posted at:</span>
            <span>{ formatDate(createdAt) }</span>
          </div>
          <div className={ styles.mainCardEditedAt }>
            <span>Updated at:</span>
            <span>{ formatDate(editedAt) }</span>
          </div>
        </div>
      </div>
      <div className={ styles.mainCardPrevious }>
        <i className="fas fa-chevron-circle-left" onClick={ goToPreviousPostWithEffect }></i>
      </div>
      <div className={ styles.mainCardNext }>
        <i className="fas fa-chevron-circle-right" onClick={ goToNextPostWithEffect }></i>
      </div>
    </div>
  );
};

