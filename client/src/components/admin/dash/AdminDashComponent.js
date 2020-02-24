import React, { useState, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Input, Select, TextArea, Icon } from "semantic-ui-react";

import MessagesComponent from "../conversations/MessagesComponent";

const style = {
  uploadBtn: {
    backgroundColor: "green",
    height: "40px",
    width: "75px",
    marginBottom: "20px"
  }
}
const { uploadBtn } = style;



const AdminDashComponent = (props) => {
  const { adminState } = props;
  const { firstName } = adminState;
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h4>Hello {firstName}</h4>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <h3>Dash Column</h3>
        </Grid.Column>
        <Grid.Column width={10}>
         
        </Grid.Column>
        <Grid.Column width={2}>
          <MessagesComponent />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
      
  );
};
// Proptypes Validations //
AdminDashComponent.propTypes = {
  adminState: PropTypes.object.isRequired
};

export default AdminDashComponent;