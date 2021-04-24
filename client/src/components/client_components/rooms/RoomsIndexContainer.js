// @flow
import * as React from "react";
import { useTranslation } from "react-i18next";
// semantic ui components //
import { Button, Col, Container, Carousel, Modal, Row } from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
import Room from "./Room";
import RoomImgModal from "./RoomImgModal";
import ClipText from "../../admin/shared/ClipText";
// redux imports //
import { connect } from "react-redux";
import { handleFetchRooms } from "../../../redux/actions/roomActions";
// FLOW types //
import type { RoomState, RoomAction } from "../../../redux/reducers/rooms/flowTypes";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
// styles //
import styles from "./css/roomIndexContainer.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  roomState: RoomState,
  _handleFetchRooms: (data? : any) => Promise<boolean>
};

type LocalComponentState = {
  showModal: boolean,
  imageIndex: number,
  clickedImage: string,
  imgURLS: Array<string>,
  headerFixed: boolean
}

const RoomsIndexContainer = ({ roomState, _handleFetchRooms }: Props) => {
  const { createdRooms } = roomState;

  const [ localComponentState, setLocalComponentState ] = React.useState<LocalComponentState>({
    showModal: false,
    imageIndex: 0,
    clickedImage: "",
    imgURLS: [],
    headerFixed: false
  });
  const [ t ] = useTranslation();
  
  const indexRowRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (indexRowRef.current) {
      const mainNav = document.getElementById("mainNav");
      if (mainNav && indexRowRef.current) {
        const navHeight = mainNav.getBoundingClientRect().height;
        window.onscroll = () => {
          const indexRowRefY = indexRowRef.current ? indexRowRef.current.getBoundingClientRect().top : 0;
          if (indexRowRefY <= navHeight) {
            if (!localComponentState.headerFixed) {
              setLocalComponentState({ ...localComponentState, headerFixed: true });
            }
          }
        }
      }
    }
    return () => {
      window.onscroll = null;
    }
  }, [ indexRowRef.current, localComponentState.headerFixed ]);

  React.useEffect(() => {
    _handleFetchRooms({ live: true });
  }, []);
  // picture modal togglers //
  const openPictureModal = (imgPath: string, roomImageURLS: Array<string>, index: number): void => {
    setLocalComponentState({ ...localComponentState, showModal: true, imgURLS: roomImageURLS, imageIndex: index });
  };
  const closePictureModal = () => {
   setLocalComponentState({ ...localComponentState, showModal: false, imageIndex: 0, imgURLS: [] });
  };
  // 
  const bookButton = () => {

  };

 
  return (
    <div>
      <NavbarComponent/>
      <div className={ styles.parallax }></div>
      <Row className={ `${styles.roomsIndexHeaderRow} ${ localComponentState.headerFixed ? styles.headerFixed : ""}`} ref={ indexRowRef } >
        <div className={ `${styles.svgContainer}` }>
          <ClipText className={ `${styles.svgText} ${ localComponentState.headerFixed ? styles.svgTextFixed : ""}` } text={t("rooms.roomHeader")} textId="rooms" fontSize={"2em"} />
        </div>
      </Row>
      <RoomImgModal 
        show={ localComponentState.showModal } 
        closePictureModal={closePictureModal }
        imgURLS={ localComponentState.imgURLS } 
        imageIndex={ localComponentState.imageIndex }
      />
      {
        createdRooms.map((room) => {
          return (
            <React.Fragment key={room._id}>
              <Container className={ styles.roomsIndexContainer } >       
                <Room  
                  index={ 0 }
                  room={room} 
                  images={room.images} 
                  openPictureModal={openPictureModal}
                  picModalState={{ showModal: localComponentState.showModal, imageIndex: localComponentState.imageIndex, direction: 1 }}
                />
                <Room  
                  index={ 1 }
                  room={room} 
                  images={room.images} 
                  openPictureModal={openPictureModal}
                  picModalState={{ showModal: localComponentState.showModal, imageIndex: localComponentState.imageIndex, direction: 1 }}
                />
              </Container>
              <div className={ styles.bottomSpacerDiv }></div>
            </React.Fragment>
          )
        })
      } 
    </div>
  );
};

// redux mapping functions //
const mapStateToProps = (state: RootState) => {
  return {
    roomState: state.roomState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<RoomAction>) => {
  return {
    _handleFetchRooms: (options?: any) => handleFetchRooms(dispatch, options)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(RoomsIndexContainer): React.AbstractComponent<Props>);