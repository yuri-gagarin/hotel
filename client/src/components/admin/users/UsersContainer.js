// @flow
import * as React from "react";
import { Grid } from "semantic-ui-react";
// additional components //
import { UsersIndexControls } from "./controls/UsersIndexControls";
// styles //
import styles from "./_css/usersContainer.module.css";

const UsersContainer = (): React.Node => {

  return (
    <Grid.Row className={ styles.usersContainerWrapper }>
      <div className={ styles.usersIndexControls }>
        <UsersIndexControls />
      </div>
    </Grid.Row>
  );
};

export default UsersContainer;