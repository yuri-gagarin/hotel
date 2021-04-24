// @flow //
import * as React from "react";
// bootstrap imports //
import { Carousel, Container } from "react-bootstrap";
// types //
// import type { RoomData } from "../../../../redux/reducers/rooms/flowTypes";
// styles and css //
import styles from "./css/mobileRoomPicsView.module.css";
// helpers //
import { setImagePath } from "../../../helpers/displayHelpers";

type Props = {
  roomImgPaths: Array<string>
};

export const MobileRoomPicsView = ({ roomImgPaths } : Props): React.Node => {
  console.log(roomImgPaths);

  return (
    <Carousel className={ styles.roomsMobileCarousel }>
      {
        roomImgPaths.map((imagePath) => {
          return (
            <Carousel.Item className={ styles.carouselItem } key={ imagePath }>
              <img src={ setImagePath(imagePath) } />
            </Carousel.Item>
          );
        })
      }
    </Carousel>
  );
};