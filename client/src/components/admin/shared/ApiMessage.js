// @flow
import * as React from "react";
import PropTypes from "prop-types";
// semantic react imports //
import { Icon, Message } from "semantic-ui-react";
// 
import type { ServiceState } from "../../../redux/reducers/service/flowTypes";
// styles and css //
import styles from "./css/apiMessage.module.css";

type LocalState = ServiceState;

const APIMessage = ({ currentLocalState } : { currentLocalState: ServiceState }): React.Node => {
  const [ messageVisible, setMessageVisible ] = React.useState(true);
  const stateRef = React.useRef(currentLocalState);

  const { loading, responseMsg, error } = currentLocalState;
  
  React.useEffect(() => {
    if (currentLocalState.loading !== stateRef.current.loading) {
      setMessageVisible(true);
    }
  }, [ currentLocalState ]);

  React.useEffect(() => {
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
        <Message icon onDismiss={ handleDismiss } negative={ error ? true : false } positive={ !error ? true : false }>
          {
            loading
            ? <Icon name='circle notched' loading={loading} />
            : (
              error 
              ? <Icon name="exclamation circle" color="red" />
              : <Icon name="check circle" color="green" /> 
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