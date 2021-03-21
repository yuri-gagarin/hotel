// @flow
import * as React from "react";
// semantic ui react imports //
import {
  Button, Popup
} from "semantic-ui-react";
// flow types//
import type { GenericModelData } from "../../../redux/reducers/_helpers/createReducer";
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
// styles //
import styles from "./css/onlinePopupControls.module.css";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

type Props = {|
  modelType: "room" | "service" | "dining",
  createdModels: Array<ServiceData>,
  handleFormOpen: () => void;
  takeAllOnline: () => Promise<boolean | void>,
  takeAllOffline: () => Promise<boolean | void>
|}
const OnlinePopupControls = ({ handleFormOpen, modelType, createdModels, takeAllOnline, takeAllOffline } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ createdModelsLength: number, numOnline: number, numOffline: number }>({ createdModelsLength: 0, numOnline: 0, numOffline: 0 });

  React.useEffect(() => {
    let numOnline: number = 0; let numOffline: number = 0;
    for (const model of createdModels) {
      model.live ? numOnline++ : numOffline ++;
    }
    setLocalState({ ...localState, createdModelsLength: createdModels.length, numOnline, numOffline });
  }, [ createdModels ]);

  return (
    <div className={ styles.onlinePopupControlsWrapper }>
     
      <Popup 
        content={ `Create a new ${capitalizeString(modelType)}`}
        trigger={
          <Button color="green" onClick={ handleFormOpen } icon="plus" content={ `Add New ${capitalizeString(modelType)}` }></Button>
        }
      />
      <Button.Group>
        <Popup 
          content={`All saved hotel ${modelType}s will be displayed to visiting clients`}
          trigger={
            <Button color="blue" content={`Take all hotel ${modelType}s online`} disabled={ localState.numOffline === 0} onClick={ takeAllOnline } />
          }
        />
        <Popup 
          content={`No ${modelType}s will be displayed to clients. This does not erase any data.`}
          trigger={
            <Button color="orange" content={`Take all ${modelType}s offline`} disabled={ localState.numOnline === 0} onClick={ takeAllOffline } />
          }
        />
      </Button.Group>
      <div className={ styles.onlineOfflineDiv }>
        <span>Number of <strong>{`${capitalizeString(modelType)}s`}</strong> online:</span>
        <div className={ `${styles.onlineOfflineCounter} ${styles.online}` }><span>{ localState.numOnline }</span></div>
      </div>
      <div className={ styles.onlineOfflineDiv }>
        <span>Number of <strong>{`${capitalizeString(modelType)}s`}</strong> offline:</span>
        <div className={ `${styles.onlineOfflineCounter} ${styles.offline}` }><span>{ localState.numOffline }</span></div>
      </div>
    </div>
  );
};

export default OnlinePopupControls;