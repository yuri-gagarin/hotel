import React, { useState } from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import {
  Container, Button
} from "semantic-ui-react";
// ck editor imports //
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const contactFrom = {
  border: "1px solid grey",
  padding: "0.5em",
  marginBottom: "0.5em"
};
const contactEmail = {
  border: "1px solid grey",
  padding: "0.5em",
  marginBottom: "0.5em"
};
const contactPhone = {
  border: "1px solid grey",
  padding: "0.5em",
  marginBottom: "0.5em"
};

const ContactPostView = (props) => {
  const { postOpen, post, handleClosePost } = props;
  const [data, setData] = useState("");

  const handleInit = (e, editor) => {

  };
  const handleEditorChange = (e, editor) =>{
    setData(editor.data());
  };
  const handleSend = () => {
    console.log(data);
  }

  if (postOpen) {
    return (
      <React.Fragment>
        <Container fluid>
          <div style={contactFrom}>
            <i className="fas fa-envelope-square"></i>
            <span>  Message from: {post.name}</span>
          </div>
          <div style={contactEmail}>  
            <i className="fas fa-reply-all"></i>            
            <span>  Email: {post.email}</span>
          </div>
          <div style={contactPhone}>
            <i className="fas fa-phone-square"></i>
            <span>  Phone: {post.phoneNumber || "No phone number given"} </span>
          </div>
        </Container>
        <Container fluid>
          <h4>Write your reply</h4>
          <CKEditor style={{height: "500px" }}
            editor={ ClassicEditor }
            data="<p>Write your response here...</p>"
           
            onInit={handleInit}
            onChange={handleEditorChange}
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
          />
        </Container>
        <Container style={{ marginTop: "1em" }}>
          <Button onClick={handleSend}>Send Reply</Button>
          <Button onClick={() => handleClosePost(post._id)}>Close Screen</Button>
        </Container>
      </React.Fragment>
      
    )
  } else {
    return (
      <div style={{ height: "100%", width: "100%", backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"}}></div>
    );
  }
};

export default ContactPostView;
