// @flow
import * as React from "react";
// style imports //
import { openMessageForm } from "./style/styles";

type Props = {
  handleFormOpen: () => void;
};

const OpenMessageForm = ({ handleFormOpen }: Props): React.Node => {
 
  return (
    <div style={openMessageForm.formContainer}> 
      <div style={openMessageForm.adminOnlineIndicator}>
      </div>
      <div>Online</div>
      <div style={openMessageForm.messageBtn} onClick={ handleFormOpen }>
        Message Us
      </div>
    </div>
  )
}
// PropTypes validation //
export default OpenMessageForm;