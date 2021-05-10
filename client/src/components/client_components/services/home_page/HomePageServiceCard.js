// @flow
import * as React from "react";
// react bootstrap //
import { Button } from "react-bootstrap";
// styles and css //
import styles from "./css/homePageServiceCard.module.css";
// helpers //
import { setImagePath } from "../../../helpers/displayHelpers";
// type //
import type { RoomData } from "../../../../redux/reducers/rooms/flowTypes";
import type { ServiceData } from "../../../../redux/reducers/service/flowTypes";
import type { DiningEntModelData } from "../../../../redux/reducers/dining_entertainment/flowTypes";



type Props = {
  modelType: "room" | "dining" | "service",
  modelData: RoomData | ServiceData | DiningEntModelData | typeof undefined,
  handleHomePageServiceClick: () => void,
  translateFunction: (stringTotranslate: string) => string
};

type TranslationConst = {
  titleTConst: string;
  descTCont: string;
  buttonTConst: string;
};

export const HomePageServiceCard = ({ modelType, modelData, handleHomePageServiceClick, translateFunction } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<TranslationConst>({ titleTConst: "", descTCont: "", buttonTConst: "" });
  const [ defaultImgUrl, setDefaultImgURL ] = React.useState<string>("");
  React.useEffect(() => {
    switch (modelType) {
      case "room": {
        setLocalState({ titleTConst: "roomsTitle", descTCont: "roomsDesc", buttonTConst: "buttons.goToRoomsBtn" });
        break;
      };
      case "dining": {
        setLocalState({  titleTConst: "dining_entertainment", descTCont: "restDesc", buttonTConst: "buttons.goToDiningBtn" });
        break;
      };
      case "service": {
        setLocalState({ titleTConst: "extras", descTCont: "extrasDesc", buttonTConst: "buttons.goToExtrasBtn" });
        break;
      };
    }
  }, []);

  React.useEffect(() => {
    if (modelData && modelData.images[0]) {
      const defaultImagePath = modelData.images[0].path;
      setDefaultImgURL(setImagePath(defaultImagePath));
    } else {
      setDefaultImgURL(setImagePath());
    }
  }, [ modelData ]);

  return (
    <div className={ styles.portfolioItemInner }>
      <a className={ `portfolio-link ${styles.portfolioItemPicLink}` } onClick={ handleHomePageServiceClick }> 
        <div className="portfolio-hover">
          <div className="portfolio-hover-content">
            <i className="fas fa-plus fa-3x"></i>
          </div>
        </div>
        <img className={ styles.serviceCardImg } src={ defaultImgUrl } alt="Default img" />
      </a>
      <div  className={ `portfolio-caption ${styles.portfolioItemPicDesc}` }>
        <h4>{ translateFunction(localState.titleTConst) }</h4>
        <p className="text-muted">{ translateFunction(localState.descTCont) }</p>
        <Button className={ styles.portfolioBtn } variant="outline-info" onClick={ handleHomePageServiceClick }>{ translateFunction(localState.buttonTConst) }</Button>
      </div>
    </div>
  );
};
