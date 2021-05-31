// @flow
import * as React from "react";
// style imports //
import styles from "./css/message.module.css";
// types //
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";

type Props = {
  adminState: any;
  messageData: MessageData;
}
const Message = ({ adminState, messageData }: Props): React.Node => {

  return (
    <div className={ `${styles.messageWrapper} ${messageData.sender === "client" ? styles.messageLeft : styles.messageRight}` }>
      <div className={ `${styles.message } ${messageData.sender === "client" ? styles.left : styles.right}`}>
        <div>{messageData.messageContent}</div>
      </div>
    </div>
  )
};

export default Message;