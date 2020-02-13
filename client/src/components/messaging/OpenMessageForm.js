import React from "react";
import PropTypes from "prop-types";
// style imports //
import { openMessageForm } from "./style/styles";

const OpenMessageForm = (props) => {

  return (
    <div style={openMessageForm.formContainer}> 
      <div style={openMessageForm.adminOnlineIndicator}>
      </div>
      <div>Online</div>
      <div style={openMessageForm.messageBtn}>
        Message Us
      </div>
    </div>
  )
}
// PropTypes validation //
export default OpenMessageForm;