// @flow 
import * as React from "react";
// redux actions //
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleFetchNewsPosts, handleOpenNewsPost } from "../../../redux/actions/newsPostActions";
// additional components //
import GenericImgModalCarousel from "../shared/GenericImgModalCarousel";
import { NewsPostMainCard } from "./NewsPostMainCard";
import { NewsPostSideCard } from "./NewsPostSideCard";
import { NewsPostReader } from "./NewsPostReader";
// types //
import type { NewsPostsState, FetchNewsPostParams, NewsPostAction } from "../../../redux/reducers/news_posts/flowTypes";
import type { RootState, Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/newsPostsIndexContainer.module.css";
import { objectValuesEmpty } from "../../helpers/displayHelpers";


type WrapperProps = {
  history: RouterHistory;
};
type Props = {
  ...WrapperProps,
  newsPostsState: NewsPostsState;
  _handleOpenNewsPost: (newsPostId: string, newsPostsState: NewsPostsState) => void;
  _handleFetchNewsPosts: (options?: FetchNewsPostParams) => Promise<boolean>;
};
type PictureModalState = {
  show: boolean;
  imgURLS: Array<string>;
  imageIndex: number;
};

const NewsPostIndexContainer = ({ history, newsPostsState, _handleFetchNewsPosts, _handleOpenNewsPost }: Props): React.Node => {
  const [ headerFixed, setHeaderFixed ] = React.useState<boolean>(false); 
  const [ pictureModalState, setPictureModalState ] = React.useState<PictureModalState>({ show: false, imgURLS: [], imageIndex: 0 });
  // header ref to fix header on scroll //
  const newsPostHeaderRef = React.useRef<HTMLDivElement | null>(null);

  const handleSelectNewsPost = (postId: string): void => {
    _handleOpenNewsPost(postId, newsPostsState);
  };
  const handleGoToPreviousNewsPost = (postId: string): void => {
    const { createdNewsPosts } = newsPostsState;
    let postIndex: number = 0;
    for (let i = 0; i < createdNewsPosts.length; i++) {
      if (createdNewsPosts[i]._id === postId) {
        i - 1 > - 1 ? postIndex = i - 1 : postIndex = 0;
        break;
      }
    }
    const previousPostId = createdNewsPosts[postIndex]._id;
    _handleOpenNewsPost(previousPostId, newsPostsState);
  };
  const handleGoToNextNewsPost = (postId: string): void => {
    const { createdNewsPosts } = newsPostsState;
    let postIndex: number = 0;
    for (let i = 0; i < createdNewsPosts.length; i++) {
      if (createdNewsPosts[i]._id === postId) {
        i + 1 < createdNewsPosts.length - 1 ? postIndex = i + 1 : postIndex = createdNewsPosts.length - 1;
        break;
      }
    }
    const nextPostId = createdNewsPosts[postIndex]._id;
    _handleOpenNewsPost(nextPostId, newsPostsState);
  };

  const handleGoToNewsPostReader = (postId: string): void => {
    const normalizedPath = newsPostsState.newsPostData.title.split(" ").join("_");
    history.push("/news" + "/" + normalizedPath);
  };
  const handleGoTopPosts = (): void => {
    history.goBack();
  };

  const handleOpenPicturesModal = (imgUrl: string, imgURLArray: Array<string>): void => {
    const imageIndex = imgURLArray.indexOf(imgUrl) > - 1 ? imgURLArray.indexOf(imgUrl) : 0;
    setPictureModalState({ show: true, imgURLS: imgURLArray, imageIndex })
  };
  const handleClosePictureModal = () => {
    setPictureModalState({ show: false, imgURLS: [], imageIndex: 0 });
  };

  const headerObserverCb = (entries: Array<IntersectionObserverEntry>) => {
    const [ entry ] = entries;
    if (entry.boundingClientRect.y < 30) {
      setHeaderFixed(true);
    }
  }

  // lifecycle methods //
  React.useEffect(() => {
    _handleFetchNewsPosts({ date: "desc" })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (newsPostsState.createdNewsPosts.length > 0 && objectValuesEmpty(newsPostsState.newsPostData)) {
      const { _id: newsPostId } = newsPostsState.createdNewsPosts[0];
      _handleOpenNewsPost(newsPostId, newsPostsState);
    }
  }, [ newsPostsState ]);

  React.useEffect(() => {
    const headerObserver = new IntersectionObserver(headerObserverCb, { root: null, rootMargin: "0px", threshold: 1.0 });
    if (newsPostHeaderRef.current) {
      headerObserver.observe(newsPostHeaderRef.current);
    }
    return () => {
      if (newsPostHeaderRef.current) headerObserver.unobserve(newsPostHeaderRef.current);
    }
  }, [ newsPostHeaderRef.current ]);
  
  return (
    <React.Fragment>
      <GenericImgModalCarousel 
        show={ pictureModalState.show }  
        closePictureModal={ handleClosePictureModal } 
        imgURLS={ pictureModalState.imgURLS } 
        imageIndex={ pictureModalState.imageIndex } 
      />
      <Route path={`/news/:newsPostTitle`}>
        <NewsPostReader 
          newsPostData={ newsPostsState.newsPostData} 
          handleGoBack={ handleGoTopPosts }
          handleGoToPreviousNewsPost={ handleGoToPreviousNewsPost }
          handleGoToNextNewsPost={ handleGoToNextNewsPost }
          handleOpenPicturesModal= { handleOpenPicturesModal }
        />
      </Route>
      <Route exact path={ "/news" }>
        <div className={ `${styles.newsPostContainerWrapper}` }>
          <div className={ `${styles.newsPostsHeader} ${ headerFixed ? styles.headerFixed : ""}` } ref={ newsPostHeaderRef }>
            <div className={ styles.newsPostsTitle }>Our News</div>
          </div>
          <div className={ `${styles.newsPostMainContent} ${ headerFixed ? styles.slideContent : "" }` } >
            <div className={ styles.newsPostsLeftContainer }>
            {
              objectValuesEmpty(newsPostsState.newsPostData)
              ?
              <div>Loading...</div>
              :
              <NewsPostMainCard 
                newsPostData={ newsPostsState.newsPostData } 
                handleGoToNewsPostReader={ handleGoToNewsPostReader }
                handleGoToPreviousNewsPost={ handleGoToPreviousNewsPost }
                handleGoToNextNewsPost={ handleGoToNextNewsPost }
              />

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
      </Route>
    </React.Fragment>
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