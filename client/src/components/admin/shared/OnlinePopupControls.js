// @flow
import * as React from "react";
// semantic ui react imports //
import { Button, Popup } from "semantic-ui-react";
// flow types//
import type { GenericModelData } from "../../../redux/reducers/_helpers/createReducer";
import type { RoomData } from "../../../redux/reducers/rooms/flowTypes";
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
import type { DiningEntModelData } from "../../../redux/reducers/dining_entertainment/flowTypes";
// styles //
import styles from "./css/onlinePopupControls.module.css";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

type Props = {|
  modelType: "room" | "service" | "dining_entertainment_model",
  createdModels: Array<ServiceData> | Array<DiningEntModelData> | Array<RoomData>,
  handleFormOpen: () => void;
  takeAllOnline: () => Promise<boolean | void>,
  takeAllOffline: () => Promise<boolean | void>
|}
const OnlinePopupControls = ({ handleFormOpen, modelType, createdModels, takeAllOnline, takeAllOffline }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ createdModelsLength: number, numOnline: number, numOffline: number }>({ createdModelsLength: 0, numOnline: 0, numOffline: 0 });

  React.useEffect((): void => {
    let numOnline: number = 0; let numOffline: number = 0;
    for (const model of createdModels) {
      model.live ? numOnline++ : numOffline++;
    }
    setLocalState({ ...localState, createdModelsLength: createdModels.length, numOnline, numOffline });
  }, [ createdModels ]);

  const refreshData = (): void => {
    window.location.reload();
  };

  return (
    <div className={ styles.onlinePopupControlsWrapper }>
     
      <Popup 
        content={ `Create a new ${capitalizeString(modelType)}`}
        trigger={
          <Button color="green" onClick={ handleFormOpen } icon="plus" content={ `Create New` }></Button>
        }
      />
      <Button.Group>
        <Popup 
          content={`All saved hotel ${modelType}s will be displayed to visiting clients`}
          trigger={
            <Button color="blue" content={`Take all online`} disabled={ localState.numOffline === 0} onClick={ takeAllOnline } />
          }
        />
        <Popup 
          content={`No ${modelType}s will be displayed to clients. This does not erase any data.`}
          trigger={
            <Button color="orange" content={`Take all offline`} disabled={ localState.numOnline === 0} onClick={ takeAllOffline } />
          }
        />
      </Button.Group>
      <div className={ styles.onlineOfflineDiv }>
        <span>Number online:</span>
        <div className={ `${styles.onlineOfflineCounter} ${styles.online}` }><span>{ localState.numOnline }</span></div>
      </div>
      <div className={ styles.onlineOfflineDiv }>
        <span>Number offline:</span>
        <div className={ `${styles.onlineOfflineCounter} ${styles.offline}` }><span>{ localState.numOffline }</span></div>
      </div>
      <div className={ styles.miscControls }>
        <Button.Group >
          <Popup 
              content={`Fetches new data`}
              trigger={
                <Button basic color="blue" content={`Refresh`}  onClick={ refreshData } />
              }
            />
        </Button.Group>
      </div>
     
    </div>
  );
};

export default OnlinePopupControls;