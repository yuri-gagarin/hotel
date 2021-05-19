// @flow
import * as React from "react";
import { formatDate } from "./../../helpers/dateHelpers";
// types //
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// styles //
import styles from "./css/message.module.css";

type Props = {
  messageData: MessageData;
}

const Message = ({ messageData }: Props): React.Node => {
  const { messageContent, sender, sentAt } = messageData;
  return (
    <div className={ styles.messageWrapperDiv }>
      <div className={ `${styles.messageDiv} ${sender === "client" ? styles.messageRight : styles.messageLeft }`}>
        { messageContent }
      </div>
    </div>
  );
};

export default Message;
