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
import { setStringTranslation } from "../../../helpers/displayHelpers";

type Props = {
  messageData: MessageData;
  updateMessage: (messageData: MessageData) => Promise<boolean>;
  triggerMessageModelDelete: (messageId: string) => void;
}
export const DefaultMessageCard = ({ messageData, updateMessage, triggerMessageModelDelete }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ inputToggled: boolean, inputValue: string }>({ inputToggled: false, inputValue: messageData.messageContent });
  const textAreaWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleClickOutside = (e): void => { 
    if (textAreaWrapperRef.current) {
      if (textAreaWrapperRef.current.contains(e.target) && !localState.inputToggled) {
        return;
      } else {
        setLocalState({ ...localState, inputToggled: false });
      }
    }
  };
  // 
  const handleDefaultMessageChange = (e: SyntheticEvent<HTMLTextAreaElement>): void => {
    setLocalState({ ...localState, inputValue: e.currentTarget.value });
  };
  const toggleEditInput = (): void => {
    localState.inputToggled ? setLocalState({ ...localState, inputToggled: false }) : setLocalState({ ...localState, inputToggled: true });
  };
  const handleSelect = (e: any): void => {
    // move cursor to the end of the text //
    e.target.selectionStart = e.target.value.length;
  };
  const updateDefaultMessageContent = (): void => {
    const updatedMessage: MessageData = { ...messageData, messageContent: localState.inputValue };
    updateMessage(updatedMessage)
      .then((success) => { if (success) setLocalState({ ...localState, inputToggled: false }); })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    if (textAreaWrapperRef.current) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => { 
      window.removeEventListener("mousedown", handleClickOutside) 
    };
  }, [ textAreaWrapperRef.current ]);

  React.useEffect(() => {
    if (localState.inputToggled && textAreaRef.current) {
      textAreaRef.current.selectionStart = textAreaRef.current.value.length;
    }
  }, [ localState.inputToggled, textAreaRef.current ]);
 
  return (
    <Card fluid key={ messageData._id } color="green">
      <Card.Content>
        <DefaultMessageMenu 
          messageData={ messageData }
          handleSetDefaultMessage={ updateMessage }
          toggleMessageEdit={ toggleEditInput }
          triggerMessageModelDelete={ triggerMessageModelDelete }
        />
      </Card.Content>
      <Card.Content className={ styles.messageCardContent }>
        <span>Message content: </span>
        <div className={ styles.messageCardContentWrapper } ref={ textAreaWrapperRef }>
        {
          localState.inputToggled 
          ?
          <div className={ styles.defaultMessageChangeDiv }> 
            <textarea autoFocus value={ localState.inputValue } onChange={ handleDefaultMessageChange } ref={ textAreaRef }></textarea>
            <button className={ `${styles.messageTextAreaBtn } ${styles.defaultMessageUpdateBtn}` } onClick={ updateDefaultMessageContent }>Update</button>
            <button className={ `${styles.messageTextAreaBtn } ${styles.defaultMessageCancelBtn}` } onClick={ toggleEditInput }>Cancel</button>
          </div>
          :
          <div className={ styles.messageContentDiv } onClick={ toggleEditInput }>{ setStringTranslation(messageData.messageContent, "en")}</div>
        }
        </div>
      </Card.Content>
      <Card.Content className={ styles.messageCardDate }>
        <span>Created at:</span>
        <span>{formatDate(messageData.sentAt, { military: false })}</span>
      </Card.Content>
    </Card>
  )
};