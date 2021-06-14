// @flow 
import * as React from "react";
import { Card } from "semantic-ui-react";
// additional components //
import { DefaultMessageMenu } from "./DefaultMessageMenu";
// types //
import type { MessageData } from "../../../../redux/reducers/conversations/flowTypes";
// styles and css //
import styles from "./css/defaultMessageCard.module.css";
// helpers //
import { formatDate } from "../../../helpers/dateHelpers";

type Props = {
  messageData: MessageData;
  handleSetDefaultMessage: (messageData: MessageData) => void;
  triggerMessageModelDelete: (messageId: string) => void;
}
export const DefaultMessageCard = ({ messageData, handleSetDefaultMessage, triggerMessageModelDelete }: Props): React.Node => {

  return (
    <Card fluid key={ messageData._id } color="green">
      <Card.Content>
        <DefaultMessageMenu 
          messageData={ messageData }
          handleSetDefaultMessage={ handleSetDefaultMessage }
          triggerMessageModelDelete={ triggerMessageModelDelete }
        />
      </Card.Content>
      <Card.Content className={ styles.messageCardContent }>
        <span>Message content: </span>
        <div>{messageData.messageContent}</div>
      </Card.Content>
      <Card.Content className={ styles.messageCardDate }>
        <span>Created at:</span>
        <span>{formatDate(messageData.sentAt, { military: false })}</span>
      </Card.Content>
    </Card>
  )
};