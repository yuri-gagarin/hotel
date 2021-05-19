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
    setMessage(e.target.value);
  };
  const handleMessageSend = (e): void => {
    if (message.length === 0) {
      return;
    } else {
      sendMessage(message);
      e.target.value = "";
      setMessage("");
    }
  }
  const handleKeyPress = (e): void => {
    if (e.charCode === 13 && message.length > 0) {
      console.log("here")
      sendMessage(message);
      setMessage("");
    }
  };
  
  return (
    <div className={ styles.messageInputWrapper } onKeyPress={ handleKeyPress }>
      <Input loading={ loading } action type="text" placeholder="message..." value={ message }  onChange={handleInputChange}  style={{ width: "100%"}} />
      <Button style={{ margin: 0 }} color="green" onClick={handleMessageSend}>Send</Button>
    </div>
  );
};

export default MessengerInput;