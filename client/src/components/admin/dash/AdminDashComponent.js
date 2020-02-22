import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import MessagesComponent from "../conversations/MessagesComponent";

const AdminDashComponent = (props) => {
  const { adminState, logoutUser } = props;
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h4>Admin Dashboard</h4>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <h3>Dash Column</h3>
        </Grid.Column>
        <Grid.Column width={9}>
          <h3>Main Column</h3>
        </Grid.Column>
        <Grid.Column width={3}>
          <MessagesComponent />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
      
  );
};
// Proptypes Validations //
AdminDashComponent.propTypes = {
  //logoutUser: PropTypes.func.isRequired
};

export default AdminDashComponent;