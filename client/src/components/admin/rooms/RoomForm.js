import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";

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
      <FileInput />
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Confirm'
      />
    </Form>
  )
};

export default RoomForm;

