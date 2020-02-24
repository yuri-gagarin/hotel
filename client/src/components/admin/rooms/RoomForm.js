import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";

const FileInput = (props) => {
  const [ file, setFile ] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  }
  const clickInput = (ref) => {
    // ref.current.click(); //
    console.log(ref);
    ref.current.click();
  };
  const uploadFile = () => {
    if (!file) return;
    let data = new FormData();
    data.append("roomImage", file);
  };

  return (
    <div>
      <Button as="label" htmlFor="file"
              icon="file" type="button">
      </Button>
      <input type="file" id="file" hidden onChange={onChange} />
      <Button
        primary
        content="Upload File"
        onClick={uploadFile} 
      />
    </div>
   
  )
};

const RoomForm = (props) => {
  const [roomOptions, setRoomOptions] = useState({});

  const handleFormSubmit = () => {
    console.log(roomOptions);
  };
  const handleCheckbox = (e,  data) => {
    const { label, checked } = data;
    switch(label) {
      case "Bathroom": {
        setRoomOptions((state) => {
          return checked ? { ...state, privateBathroom: true } : { ...state, privateBathroom: false };
        });
        break;
      }
      case "Suite Bathroom": {
        setRoomOptions((state) => {
          return checked ? { ...state, suiteBathroom: true } : { ...state, suiteBathroom: false };
        });
        break;
      } 
      case "Balcony": {
        setRoomOptions((state) => {
          return checked ? { ...state, balcony: true } : { ...state, balcony: false };
        })
        break;
      } 
      case "Terrace": {
        setRoomOptions((state) => {
          return checked ? { ...state, terrace: true } : { ...state, terrace: false };
        })
        break;
      }
      case "Mountain View": {
        setRoomOptions((state) => {
          return checked ? { ...state, mountainView: true } : { ...state, mountainView: false };
        })
        break;
      } 
      case "Street View": {
        setRoomOptions((state) => {
          return checked ? { ...state, streetView: true } : { ...state, streetView: false };
        })
        break;
      } 
      case "River View": {
        setRoomOptions((state) => {
          return checked ? { ...state, riverView: true } : { ...state, riverView: false };
        })
        break;
      }
      case "TV": {
        setRoomOptions((state) => {
          return checked ? { ...state, tv: true } : { ...state, tv: false };
        })
        break;
      }
      case "Air Conditioning": {
        setRoomOptions((state) => {
          return checked ? { ...state, airConditioning: true } : { ...state, airConditioning: false };
        })
        break;
      }
      case "WiFi": {
        setRoomOptions((state) => {
          return checked ? { ...state, wifi: true } : { ...state, wifi: false };
        })
        break;
      }
    };
  } 

  return (
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
       <Form.Field>
        <Checkbox label='Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Suite Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Balcony' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Terrace' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Mountain View' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Street View' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='River View' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='TV' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Air Conditioning' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='WiFi' style={{margin: "0.5em"}} onChange={handleCheckbox} />

      </Form.Field>
      <FileInput />
      <Form.Field style={{marginTop: "0.5em"}}
        id='form-button-control-public'
        control={Button}
        content='Confirm'
        onClick={handleFormSubmit}
      />
     
    </Form>
  )
};

export default RoomForm;

