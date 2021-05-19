// @flow
import * as React from "react";
import { Button, Input } from "semantic-ui-react";
import styles from './css/messengerInput.module.css';

type Props = {
  loading: boolean;
  sendMessage: (content: string) => Promise<boolean>;
}
const MessengerInput = ({ loading, sendMessage }: Props): React.Node => {
  const [ message, setMessage ] = React.useState<string>("");

  const handleInputChange = (e): void => {
    if (e.charCode === 13) {
      sendMessage(message);
      e.target.value = "";
      setMessage("");
    }
    setMessage(e.target.value);
  };
  const handleMessageSend = (e): void => {
    sendMessage(message);
    e.target.value = "";
    setMessage("");
  };
  
  return (
    <div className={ styles.messageInputWrapper }>
      <Input loading={ loading } action type="text" placeholder="message..."  onChange={handleInputChange} style={{ width: "100%"}} />
      <Button style={{ margin: 0 }} color="green" onClick={handleMessageSend}>Send</Button>
    </div>
   

  );
};

export default MessengerInput;