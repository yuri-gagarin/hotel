// @flow 
import * as React from "react";
// semantic ui react //
import { Header, Icon, Image, Segment } from "semantic-ui-react";
// flow types //
import type { DiningImgData, MenuImageData } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { NewsPostImgData } from "../../../redux/reducers/news_posts/flowTypes";
import type { RoomImgData } from "../../../redux/reducers/rooms/flowTypes";
import type { ServiceImgData } from "../../../redux/reducers/service/flowTypes";
// styles and css //
import styles from "./css/previewImagesCarousel.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  images: Array<ServiceImgData> | Array<DiningImgData> | Array<MenuImageData> | Array<RoomImgData> | Array<NewsPostImgData>, 
  showDeleteIcons: boolean,
  toggleImageModal: (imgPath: string) => void,
  triggerImgModelDelete?: (imgIdToDelete: string) => void
}
type LocalState = {
  elementPositions: Array<number>,
  positionIndex: number,
  totalElements: number
}
export const PreviewImagesCarousel = ({ images, showDeleteIcons, toggleImageModal, triggerImgModelDelete }: Props): React.Node => {

  const imagesWrapperRef = React.useRef<HTMLElement | null>(null);
  // const [ localState, setLocalState ] = React.useState<LocalState>({ elementPositions: [], positionIndex: 0, totalElements: 0 });
  const [ scrollState, setScrollState ] = React.useState<number>( 0 )

  /*
  React.useEffect(() => {
    console.log("loaded")
  })
  React.useEffect(() => {
    if (imagesWrapperRef.current) {
      const imagesWrapperDiv = imagesWrapperRef.current;
      const childImgElems = imagesWrapperDiv.children;
      let totalElements = 0;
      const positions: Array<number> = [];

      for (const imgElem of childImgElems) {
        const leftPosition: number = imgElem.offsetLeft;
        totalElements++;
        positions.push(leftPosition);
      }
      setLocalState({ ...localState, totalElements, elementPositions: positions });
    }
  }, [ images, imagesWrapperRef.current ]);
  */

  
  const scrollToNext = () => {
    if (imagesWrapperRef.current) {
      const scrollWidth: number = imagesWrapperRef.current.scrollWidth;
      imagesWrapperRef.current.scrollTo({ left: scrollState + 300,  behavior: "smooth" });
      console.log(scrollWidth);
      setScrollState(scrollState + 300);
      if ((scrollState + 300) > scrollWidth) {
        console.log("stahp")
        setScrollState(scrollWidth);
      }
    }
  };
  const scrollToPrevious = () => {
    if (imagesWrapperRef.current) {
      imagesWrapperRef.current.scrollTo({ left: scrollState - 300,  behavior: "smooth" });
      if ((scrollState - 300) < 0) {
        setScrollState(0)
      } else {
        setScrollState(scrollState - 300);
      }
    }
  };

  return (
    <div className={ styles.imagesCarouselWrapper }>
      <div className={ `${styles.imagesControl} ${styles.imagesControlLeft}`} onClick={ scrollToPrevious }>
        <Icon name="arrow circle left"></Icon>
      </div>
      <div className={ styles.imagesWrapper } ref={ imagesWrapperRef }>
        {
          images.length > 0 
          ? 
            <div className={ styles.innerWrapper }>
              {
                images.map((img) => {
                  return (
                    <div className={ styles.imgDiv } key={img._id} >
                      {
                        (showDeleteIcons && triggerImgModelDelete) 
                        ?
                        <span className={ styles.imgDeleteSpan }>
                          <i className="fas fa-trash-alt" onClick={ () => triggerImgModelDelete(img._id)}></i>
                        </span>
                        :
                        null
                      }
                      <Image rounded fluid src={ setImagePath(img.path) } onClick={ () => toggleImageModal(img.path) } />
                    </div>
                  );
                })

              }
    
            </div>
           
          : 
            <Segment placeholder className={ styles.defaultNoImagesSegment }>
              <Header icon>
                <Icon name="image outline" />
                No images are uploded for this service
              </Header>
              
            </Segment>
        }
      </div>
      <div className={ `${styles.imagesControl} ${styles.imagesControlRight}`} onClick={ scrollToNext }> 
        <Icon name="arrow circle right"></Icon>
      </div>
    </div>
  );
};