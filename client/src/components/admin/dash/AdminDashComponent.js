import React, { useState, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Input, Select, TextArea, Icon } from "semantic-ui-react";

import MessagesComponent from "../conversations/MessagesComponent";
import Axios from "axios";

const FileInput = (props) => {
  const [ file, setFile ] = useState(null);
  const inputRef = useRef(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  }
  const clickInput = (ref) => {
    // ref.current.click(); //
    console.log(ref);
    ref.current.click();
  };
  const uploadFile = () => {
    console.log(file);
    let data = new FormData();
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
    data.append("roomImage", file);
    console.log(data);
    return Axios.post("/api/uploadRoomImage", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.message);
      })
  }
  return (
    <div>
      <Button as="label" htmlFor="file"
              icon="file" type="button">
      </Button>
      <input type="file" id="file" hidden onChange={onChange} />
      <Button content="Upload File"
              labelPosition="left"
              onClick={uploadFile}>
      </Button>
    </div>
   
  )
}

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
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                label='First name'
                placeholder='First name'
              />
              <Form.Field
                control={Input}
                label='Last name'
                placeholder='Last name'
              />
              <Form.Field
                control={Input}
                label="Price"
                placeholder='Price...'
              />
            </Form.Group>
            <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Opinion'
              placeholder='Opinion'
            />
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              placeholder='joe@schmoe.com'
            />
            <FileInput />
            <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Confirm'
            />
          </Form>
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