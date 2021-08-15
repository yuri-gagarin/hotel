// @flow
import * as React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
// additonal components //
import { CardOnlineStatusBlinkers } from "../../shared/CardOnlineStatusBlinkers";
// type imports //
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/postPreviewControls.module.css";

type Props = {
  history: RouterHistory;
  online: boolean;
  handleOpenEditNewsPost: () => void;
  triggerDeleteCurrentNewsPost: () => void;
}
export const PostPreviewControls = ({ history, online, handleOpenEditNewsPost, triggerDeleteCurrentNewsPost }: Props): React.Node => {

  const goBack = (): void => {
    history.goBack();
  };

  return (
    <div className={ styles.postPreviewControlsWrapper }>
      <Button.Group className={ styles.postControlBtns }>
        <Button inverted color="blue" onClick={ goBack }>Back</Button>
        <Button inverted color="orange" onClick={ handleOpenEditNewsPost }>Edit</Button>
        <Button color="red" onClick={ triggerDeleteCurrentNewsPost }>Delete</Button>
      </Button.Group>
      <Button.Group className={ styles.postOnlineBtns }>
        <Button icon inverted color={ online ? "red" : "green" } labelPosition="right">
          <Popup  
            content={ online ? "Post is online and visible" : "Post is offline, not visible to clients" }
            trigger={ <Icon className= {online ? styles.onlineIcon : styles.offlineIcon } name="world" /> }
          />
          { online ? "Take Offline" : "Take Online" }
        </Button>
      </Button.Group>
    </div>
  );
};