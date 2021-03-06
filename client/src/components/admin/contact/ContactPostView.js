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
  backgroundStyle, contactForm, contactEmail, contactPhone, contactBody
} from "./style/styles";

const iconStyle = {
  color: "rgb(3, 152, 252)",
  fontSize: "1.5em",
  marginRight: "0.5em"
}
const setInitialMessage = (post) => {
  return (
    `
    <p>your response ... </p>
    `
  );
}
const ContactPostView = (props) => {
  const { 
    postOpen, post, 
    handleClosePost, sendContactReply 
  } = props;
  const [data, setData] = useState(setInitialMessage(post));

  const handleInit = (e, editor) => {
   
  };
  const handleEditorChange = (e, editor) =>{
    setData(editor.getData());
  };
  const handleSend = () => {
    sendContactReply(data);
  };


  if (postOpen) {
    return (
      <React.Fragment>
        <Container fluid>
          <div style={contactForm}>
            <i className="fas fa-sticky-note" style={iconStyle}></i>
            <span>  Message from: {post.name}</span>
          </div>
          <div style={contactEmail}>  
            <i className="fas fa-envelope-square"  style={iconStyle}></i>            
            <span>Email: </span><a href="#" style={{color: "blue"}}>{post.email}</a>
          </div>
          <div style={contactPhone}>
            <i className="fas fa-phone-square"  style={iconStyle}></i>
            <span>  Phone: {post.phoneNumber || "No phone number given"} </span>
          </div>
        </Container>
        <Container>
          <h4>Request from: {post.name}</h4>
          <div style={contactBody}>
            {post.content}
          </div>
        </Container>
        <Container fluid>
          <h4>Write your reply</h4>
          <CKEditor style={{height: "500px" }}
            editor={ ClassicEditor }
            data={setInitialMessage(post)}
           
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
          <Button onClick={sendContactReply}>Send Reply</Button>
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
