// @flow
import * as React from "react";
// semantic react imports //
import { Icon, Message } from "semantic-ui-react";
// 
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { ServiceState } from "../../../redux/reducers/service/flowTypes";
import type { ContactPostState } from "../../../redux/reducers/contact_posts/flowTypes";
import type { RoomState } from "../../../redux/reducers/rooms/flowTypes";
// styles and css //
import styles from "./css/apiMessage.module.css";

type LocalState = AdminConversationState | ServiceState | ContactPostState | RoomState;

const APIMessage = ({ currentLocalState } : { currentLocalState: LocalState }): React.Node => {
  const [ messageVisible, setMessageVisible ] = React.useState(true);

  const { loading, responseMsg, error } = currentLocalState;
  
  React.useEffect(() => {
    if (currentLocalState.loading) {
      setMessageVisible(true);
    }
  }, [ currentLocalState.loading ]);

  React.useEffect(() => {
    const { status, loading, error } = currentLocalState;
    if (status === 200 && !loading && !error && messageVisible) {
      setTimeout(() => {
        handleDismiss();
      }, 1000);
    }
  }, [ currentLocalState ]);

  const handleDismiss = () => {
    setMessageVisible(false);
  };

  return (
    messageVisible
    ? 
      <div className={ styles.apiMessageContainer }>
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

export default APIMessage;