// @flow
import * as React from "react";
import { Button, Icon, Popup, Segment } from "semantic-ui-react";
// additional components //
import GenericImgModal from "../../shared/GenericImgModal";
import { PreviewImagesCarousel } from "../../shared/PreviewImagesCarousel";
// styles //
import styles from "./css/newsPostPreviewCard.module.css";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";
import { setImagePath } from "../../../helpers/displayHelpers"

type Props = {
  newsPostData: NewsPostData;
  closeCurrentNewsPost: () => void;
  handleOpenEditCurrentNewsPost: () => void;
  triggerDeleteCurrentNewsPost: () => void;
  toggleNewsPostLiveStatus: () => Promise<boolean>;
}
export const NewsPostPreviewCard = ({ newsPostData, closeCurrentNewsPost, handleOpenEditCurrentNewsPost, triggerDeleteCurrentNewsPost, toggleNewsPostLiveStatus }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ imgModalOpen: boolean; imgURL: string }>({ imgModalOpen: false, imgURL: "" });

  const toggleImgModal = (imagePath: string): void => {
    setLocalState({ imgModalOpen: true, imgURL: setImagePath(imagePath) });
  };
  const handleImgModalClose = (): void => {
    setLocalState({ imgModalOpen: false, imgURL: "" });
  };

  return (
    <Segment style={{ height: "100%", width: "100%" }}>
      <GenericImgModal open={ localState.imgModalOpen } imgURL={ localState.imgURL } handleClose={ handleImgModalClose } />
      <div className={ styles.controlsRow }>
        <Button.Group>
          <Button inverted color="blue" onClick={ closeCurrentNewsPost }>
            Close
            <Icon className={ styles.postPrevCardControlIcon } name="cancel" />
          </Button>
          <Button inverted color="orange" onClick={ handleOpenEditCurrentNewsPost }>
            Edit
            <Icon className={ styles.postPrevCardControlIcon } name="edit" />
          </Button>
          <Button color="red" onClick={ triggerDeleteCurrentNewsPost }>
            Delete
            <Icon className={ styles.postPrevCardControlIcon } name="trash alternate outline" />
          </Button>
        </Button.Group>
        <Button.Group className={ styles.postOnlineBtns }>
          <Button icon basic color={ newsPostData.live ? "red" : "green" } labelPosition="right" onClick={ toggleNewsPostLiveStatus }>
            <Popup  
              content={ newsPostData.live ? "Post is online and visible" : "Post is offline, not visible to clients" }
              trigger={ <Icon className= { newsPostData.live ? styles.onlineIcon : styles.offlineIcon } name="world" /> }
            />
            { newsPostData.live ? "Take Offline" : "Take Online" }
          </Button>
        </Button.Group>
        <div className={ styles.newsPostImagesCount }>
          <div>{ newsPostData.images.length }</div>
          <span>uploaded images</span>
        </div>
      </div>
      <div className={ styles.titleDiv }>
        <span>Title:</span>
        <div>{newsPostData.title}</div>
      </div>
      <div className={ styles.authorDiv }>
        <span>Author:</span>
        <div>{newsPostData.createdBy}</div>
      </div>
      <div className={ styles.contentDiv }>
        <div dangerouslySetInnerHTML={{__html: newsPostData.content }}></div>
        {
        newsPostData.images.length > 0
        ?
        <div className={ styles.imagesDiv }>
          <div>Uploaded images:</div>
          <PreviewImagesCarousel 
            images={ newsPostData.images }
            toggleImageModal={ toggleImgModal }
          />
        </div>
        :
        null
        }
      </div>
      
      
      <div className={ styles.timeStampsDiv }>
        <div className={ styles.createdAtDiv }>
          <span>Created At:</span>
          <span>{ formatDate(newsPostData.createdAt) }</span>
        </div>
        <div className={ styles.editedAtDiv }>
          <span>Edited At:</span>
          <span>{ formatDate(newsPostData.editedAt) }</span>
        </div>
      </div>
    </Segment>
  );
};
