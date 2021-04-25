// @flow
import * as React from "react";
// react bootstrap //
import { Button } from "react-bootstrap";
// styles and css //
import styles from "./css/homePageServiceCard.module.css";
// helpers //
import { setImagePath } from "../../../helpers/displayHelpers";

type Props = {
  modelType: "room" | "dining" | "service",
  handleHomePageServiceClick: () => void,
  translateFunction: (stringTotranslate: string) => string
};

type TranslationConstants = {
  titleTConst: string,
  descTCont: string,
  buttonTConst: string
};

export const HomePageServiceCard = ({ modelType, handleHomePageServiceClick, translateFunction } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<TranslationConstants>({ titleTConst: "", descTCont: "", buttonTConst: "" });

  React.useEffect(() => {
    switch (modelType) {
      case "room": {
        setLocalState({ titleTConst: "roomsTitle", descTCont: "roomsDesc", buttonTConst: "buttons.goToRoomsBtn" });
        break;
      };
      case "dining": {
        setLocalState({ titleTConst: "dining_entertainment", descTCont: "restDesc", buttonTConst: "buttons.goToDiningBtn" });
        break;
      };
      case "service": {
        setLocalState({ titleTConst: "extras", descTCont: "extrasDesc", buttonTConst: "buttons.goToExtrasBtn" });
        break;
      };
    }
  }, []);

  return (
    <div className={ styles.portfolioItemInner }>
      <a className={ `portfolio-link ${styles.portfolioItemPicLink}` } onClick={ handleHomePageServiceClick }> 
        <div className="portfolio-hover">
          <div className="portfolio-hover-content">
            <i className="fas fa-plus fa-3x"></i>
          </div>
        </div>
        <img className={ styles.serviceCardImg } src={ setImagePath() } alt="Default img" />
      </a>
      <div  className={ `portfolio-caption ${styles.portfolioItemPicDesc}` }>
        <h4>{ translateFunction(localState.titleTConst) }</h4>
        <p className="text-muted">{ translateFunction(localState.descTCont) }</p>
        <Button className={ styles.portfolioBtn } variant="outline-info" onClick={ handleHomePageServiceClick }>{ translateFunction(localState.buttonTConst) }</Button>
      </div>
    </div>
  );
};
