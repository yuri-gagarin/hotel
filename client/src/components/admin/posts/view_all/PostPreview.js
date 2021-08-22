// @flow
import * as React from "react";
// additonal components //
import GenericImgModal from "../../shared/GenericImgModal";
import { PostPreviewControls } from "../controls/PostPreviewControls";
import { PreviewImagesCarousel } from "../../shared/PreviewImagesCarousel";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/postPreview.module.css";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";
import { setImagePath } from "../../../helpers/displayHelpers";

type Props = {
  history: RouterHistory;
  newsPostData: NewsPostData;
  handleOpenEditNewsPost: () => void;
  triggerDeleteCurrentNewsPost: () => void;
  toggleNewsPostLiveStatus: () => Promise<boolean>;
}
export const PostPreview = ({ history, newsPostData, handleOpenEditNewsPost, triggerDeleteCurrentNewsPost, toggleNewsPostLiveStatus }: Props): React.Node => {
  const { title, createdBy, live, content, images, editedAt, createdAt } = newsPostData;
  // local state for img modal //
  const [ localState, setLocalState ] = React.useState<{ imgModalOpen: boolean, imgURL: string }>({ imgModalOpen: false, imgURL: "" });

  const handleImgModalClose = (): void => {
    setLocalState({ imgModalOpen: false, imgURL: "" });
  };
  const handleImgModalOpen = (imgPath: string): void => {
    setLocalState({ imgModalOpen: true, imgURL: setImagePath(imgPath) });
  };

  
  return (
    <div className={ styles.newsPostPreviewWrapper }>
      <GenericImgModal open={ localState.imgModalOpen} imgURL={ localState.imgURL } handleClose={ handleImgModalClose } />
      <div className={ styles.newsPostPreviewCtrls}>
        <PostPreviewControls 
          history={ history } 
          online={ live } 
          handleOpenEditNewsPost={ handleOpenEditNewsPost } 
          triggerDeleteCurrentNewsPost={ triggerDeleteCurrentNewsPost }
          toggleNewsPostLiveStatus={ toggleNewsPostLiveStatus }
        />
      </div>
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
        {
          images.length > 0 
          ?
          <div className={ styles.postPreviewImages }>
            <div>Uploaded images:</div>
            <PreviewImagesCarousel images={ images } toggleImageModal={ handleImgModalOpen } />
          </div>
          : 
          null
        }
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