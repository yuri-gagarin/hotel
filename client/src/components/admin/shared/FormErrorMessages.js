// @flow 
import * as React from "react";
import { Message } from "semantic-ui-react";

type Props = {
  visible: boolean,
  errorMessages: Array<string>,
  handleErrorMessageDismiss: () => void
}
export const FormErrorMessages = ({ visible, errorMessages, handleErrorMessageDismiss } : Props): React.Node => {

  
  return (
    <Message 
      visible={false}
      error
      onDismiss={ handleErrorMessageDismiss }
      header="Errors with your submission"
      list={errorMessages}
    />
  );
};