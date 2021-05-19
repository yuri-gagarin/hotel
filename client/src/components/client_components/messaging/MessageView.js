// @flow
import * as React from "react";
import { Button, Input } from "semantic-ui-react";

type Props = {
  sendMessage: (content: string) => Promise<boolean>;
}
const MessageView = ({ sendMessage }: Props): React.Node => {
  const [ message, setMessage ] = React.useState<string>("");

  const handleInputChange = (e) => {
    if (e.charCode === 13) {
      sendMessage(message);
      e.target.value = "";
      setMessage("");
    }
    setMessage(e.target.value);
  };
  const handleMessageSend = (e) => {
    sendMessage(message);
    e.target.value = "";
    setMessage("");
  };
  
  return (
    <Input type="text" placeholder="message..." action onChange={handleInputChange} style={{ border: "2px solid red", width: "100%"}}>
      <input />
      <Button onClick={handleMessageSend}>Send</Button>
    </Input>
  );
};

export default MessageView;