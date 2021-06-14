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
  const [ localState, setLocalState ] = React.useState<{ inputToggled: boolean, inputValue: string }>({ inputToggled: false, inputValue: messageData.messageContent });
  const textAreaWrapperRef = React.useRef<HTMLDivElement | null>(null);

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

  React.useEffect(() => {
    if (textAreaWrapperRef.current) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => { 
      window.removeEventListener("mousedown", handleClickOutside) 
    };
  }, [ textAreaWrapperRef.current ]);
 
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
        <div className={ styles.messageCardContentWrapper } ref={ textAreaWrapperRef }>
        {
          localState.inputToggled 
          ?
          <div className={ styles.defaultMessageChangeDiv }> 
            <textarea autoFocus onSelect={ handleSelect } value={ localState.inputValue } onChange={ handleDefaultMessageChange }></textarea>
            <button className={ styles.defaultMessageUpdateBtn }>Update</button>
          </div>
          :
          <div className={ styles.messageContentDiv } onClick={ toggleEditInput }>{messageData.messageContent}</div>
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