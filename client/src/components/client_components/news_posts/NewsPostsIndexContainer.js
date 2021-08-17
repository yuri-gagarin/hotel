// @flow 
import * as React from "react";
// redux actions //
import { connect } from "react-redux";
import { handleFetchNewsPosts } from "../../../redux/actions/newsPostActions";
// additional componets //
import { NewsPostSideCard } from "./NewsPostSideCard";
// types //
import type { NewsPostsState, FetchNewsPostParams, NewsPostAction } from "../../../redux/reducers/news_posts/flowTypes";
import type { RootState, Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
// styles //
import styles from "./css/newsPostsIndexContainer.module.css";
import { NewsPostMainCard } from "./NewsPostMainCard";


type WrapperProps = {

};
type Props = {
  ...WrapperProps,
  newsPostsState: NewsPostsState;
  _handleFetchNewsPosts: (options?: FetchNewsPostParams) => Promise<boolean>;
};
const NewsPostIndexContainer = ({ newsPostsState, _handleFetchNewsPosts }: Props): React.Node => {

  React.useEffect(() => {
    _handleFetchNewsPosts({ date: "desc" });
  }, []);

  return (
    <div className={ styles.newsPostContainerWrapper }>
      <div className={ styles.newsPostsHeader }></div>
      <div className={ styles.newsPostMainContent } >
        <div className={ styles.newsPostsLeftContainer }>
          {
            newsPostsState.createdNewsPosts[0]
            ?
            <NewsPostMainCard newsPostData={ newsPostsState.createdNewsPosts[0] } />
            :
            null
          }
        </div>
        <div className={ styles.newsPostsRightContainer }>
          <div className={ styles.newsPostsSideCardDiv }>
            { newsPostsState.createdNewsPosts.map((newsPostData) => {
                return (
                  <NewsPostSideCard 
                    key={ newsPostData._id }
                    newsPostData={ newsPostData } 
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
    _handleFetchNewsPosts: (options?: FetchNewsPostParams) => handleFetchNewsPosts(dispatch, options)
  };  
};

export default (connect(mapStateToProps, mapDispatchToProps)(NewsPostIndexContainer): React.AbstractComponent<WrapperProps>);