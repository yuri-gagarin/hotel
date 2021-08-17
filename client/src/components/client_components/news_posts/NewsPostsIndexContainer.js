// @flow 
import * as React from "react";
// redux actions //
import { connect } from "react-redux";
import { handleFetchNewsPosts, handleOpenNewsPost } from "../../../redux/actions/newsPostActions";
// additional componets //
import { NewsPostSideCard } from "./NewsPostSideCard";
// types //
import type { NewsPostsState, FetchNewsPostParams, NewsPostAction } from "../../../redux/reducers/news_posts/flowTypes";
import type { RootState, Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
// styles //
import styles from "./css/newsPostsIndexContainer.module.css";
import { NewsPostMainCard } from "./NewsPostMainCard";
import { objectValuesEmpty } from "../../helpers/displayHelpers";


type WrapperProps = {

};
type Props = {
  ...WrapperProps,
  newsPostsState: NewsPostsState;
  _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => void;
  _handleFetchNewsPosts: (options?: FetchNewsPostParams) => Promise<boolean>;
};
const NewsPostIndexContainer = ({ newsPostsState, _handleFetchNewsPosts, _handleOpenNewsPost }: Props): React.Node => {


  const handleSelectNewsPost = (postId: string): void => {
    _handleOpenNewsPost(postId, newsPostsState);
  };

  // lifecycle methods //
  React.useEffect(() => {
    _handleFetchNewsPosts({ date: "desc" })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (newsPostsState.createdNewsPosts.length > 0 && objectValuesEmpty(newsPostsState.newsPostData)) {
      console.log(newsPostsState)
      const { _id: newsPostId } = newsPostsState.createdNewsPosts[0];
      _handleOpenNewsPost(newsPostId, newsPostsState);
    }
  }, [ newsPostsState ]);

  return (
    <div className={ styles.newsPostContainerWrapper }>
      <div className={ styles.newsPostsHeader }></div>
      <div className={ styles.newsPostMainContent } >
        <div className={ styles.newsPostsLeftContainer }>
          {
            objectValuesEmpty(newsPostsState.newsPostData)
            ?
            <div>Loading...</div>
            :
            <NewsPostMainCard newsPostData={ newsPostsState.newsPostData } />

          }
        </div>
        <div className={ styles.newsPostsRightContainer }>
          <div className={ styles.newsPostsSideCardDiv }>
            { newsPostsState.createdNewsPosts.map((newsPostData) => {
                return (
                  <NewsPostSideCard 
                    key={ newsPostData._id }
                    active={ newsPostData._id === newsPostsState.newsPostData._id }
                    newsPostData={ newsPostData }
                    handleSelectNewsPost={ handleSelectNewsPost } 
                  />
                )
              })
            }
          </div>
        </div>
          
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    newsPostsState: state.newsPostsState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<NewsPostAction>) => {
  return {
    _handleFetchNewsPosts: (options?: FetchNewsPostParams) => handleFetchNewsPosts(dispatch, options),
    _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => handleOpenNewsPost(dispatch, newsPostId, newsPostsState)
  };  
};

export default (connect(mapStateToProps, mapDispatchToProps)(NewsPostIndexContainer): React.AbstractComponent<WrapperProps>);