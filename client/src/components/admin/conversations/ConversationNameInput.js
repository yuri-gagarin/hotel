// @flow 
import * as React from "react";
// 
import type { AdminConversationData } from "../../../redux/reducers/admin_conversations/flowTypes"; 
//
import styles from "./css/conversationNameInput.module.css";

type Props = {
  adminConversationData: AdminConversationData;
  updateAdminConversationName: (data: { newName: string, conversationId: string }) => void;
}
type LocalState = {
  inputSelected: boolean;
  showUpdateBtn: boolean;
  inputValue: string;
  backupString: string;
};

export const ConversationNameInput = ({ adminConversationData, updateAdminConversationName }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ 
    inputSelected: false, 
    showUpdateBtn: false, 
    inputValue: adminConversationData.conversationName ? adminConversationData.conversationName : "Anonymous", 
    backupString: adminConversationData.conversationName ? adminConversationData.conversationName : "Anonymous"
  });
  const componentRef = React.useRef<HTMLDivElement | null>(null);
  // event handlers //
  const handleClickOutside = (e): void => {
    if (componentRef.current) {
      if (componentRef.current.contains(e.target)) {
        return;
      } else {
        setLocalState({ ...localState, inputSelected: false, showUpdateBtn: false, inputValue: localState.backupString });
      }
    }
  } 
  const selectNameInput = (e): void => {
    e.stopPropagation();
    setLocalState({ ...localState, inputSelected: true, showUpdateBtn: true });
  };
  const handleInputChange = (e): void => {
    setLocalState({ ...localState, inputValue: e.target.value });
  };
  const updateName = (e): void => {
    e.stopPropagation();
    updateAdminConversationName({ conversationId: adminConversationData.conversationId, newName: localState.inputValue });
    setLocalState({ ...localState, backupString: localState.inputValue, inputSelected: false, showUpdateBtn: false });
  };

  React.useEffect(() => {
    if (localState.showUpdateBtn) {
      window.document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ localState.showUpdateBtn ]);

  return (
    <div className={ styles.conversationNameInputWrapper }> 
      <div className={ styles.conversationNameDisplay}>
        <span>Conversation name:</span>
        <input 
          type="text"
          className={ styles.conversationNameInput } 
          value={ localState.inputValue }
          readOnly={ localState.inputSelected ? false : true }
          onClick={ selectNameInput }
          onChange={ handleInputChange }
        >
        </input>
      </div>
      
      <div className={ `${styles.updateConversationNameBtn} ${ localState.showUpdateBtn ? styles.conversationNameBtnShow : ""}` } onClick={ updateName } ref={ componentRef }>
        Update
      </div>
    </div>
  )
};