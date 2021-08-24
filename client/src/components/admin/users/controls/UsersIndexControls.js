// @flow
import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
// styles //
import styles from "./_css/usersIndexControls.module.css";

type Props = {

};

export const UsersIndexControls = (props: Props): React.Node => {

  return (
    <div className={ styles.controlsWrapper }>
      <Button.Group>
        <Button color="green">
          New
          <Icon className={ styles.controlsIcon } name="file alternate outline" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button basic color="blue">
          Edit My Profile
          <Icon className={ styles.controlsIcon } name="user circle outline" />
        </Button>
      </Button.Group>
    </div>
  )
};

