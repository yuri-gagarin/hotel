import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// semantic react imports //
import {
  Icon,
  Message
} from "semantic-ui-react";
// styles and css //
import styles from "./css/apiMessage.module.css";


const APIMessage = ({ currentLocalState }) => {
  const [ messageVisible, setMessageVisible ] = useState(true);
  const stateRef = useRef(currentLocalState);

  const { loading, responseMsg, error } = currentLocalState;
  
  useEffect(() => {
    if (currentLocalState.loading !== stateRef.current.loading) {
      console.log(21)
      setMessageVisible(true);
    }
  }, [ currentLocalState ]);

  useEffect(() => {
    if (!currentLocalState.loading && !currentLocalState.error && messageVisible) {
      setTimeout(() => {
        handleDismiss();
      }, 1000);
    }
  }, [ currentLocalState.loading, currentLocalState.error ]);

  const handleDismiss = () => {
    setMessageVisible(false);
  };

  return (
    messageVisible 
    ? 
      <div className={ styles.apiMessageContainer } id="message">
        <Message icon onDismiss={ handleDismiss } negative={ error ? true : false }>
          {
            loading
            ? <Icon name='circle notched' loading={loading} />
            : (
              error 
              ? <Icon name="exclamation circle" color="red" />
              : <Icon name="check circle" /> 
            )
          }
          <Message.Content>
          <Message.Header>{ loading ? "Processing" : ( error ? "Error" : "Finished") }</Message.Header>
          {
            loading ? "Processing your request" :  responseMsg
          }
          </Message.Content>

        </Message>
      </div>
    : 
      null
  );
};

APIMessage.propTypes = {
  currentLocalState: PropTypes.object.isRequired
};

export default APIMessage;