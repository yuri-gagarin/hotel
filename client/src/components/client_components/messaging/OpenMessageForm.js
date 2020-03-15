import React, { useEffect } from "react";
import PropTypes from "prop-types";
// style imports //
import { openMessageForm } from "./style/styles";

const OpenMessageForm = (props) => {
  const {handleFormOpen} = props;
  useEffect(() => {
    console.log(document.getElementById("clientMessageForm"));
  })
  return (
    <div style={openMessageForm.formContainer}> 
      <div style={openMessageForm.adminOnlineIndicator}>
      </div>
      <div>Online</div>
      <div style={openMessageForm.messageBtn} onClick={handleFormOpen}>
        Message Us
      </div>
    </div>
  )
}
// PropTypes validation //
export default OpenMessageForm;