import React, { useState } from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import {
  Container, Button
} from "semantic-ui-react";
// ck editor imports //
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// style imports //
import {
  backgroundStyle, contactForm, contactEmail, contactPhone
} from "./style/styles";

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
          <div style={contactForm}>
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
      <div 
        style={backgroundStyle}>
      </div>
    );
  }
};

export default ContactPostView;
