// @flow 
import * as React from "react";
// 
import styles from "./css/conversationNameInput.module.css";

type Props = {

}
type LocalState = {
  inputSelected: boolean;
  showUpdateBtn: boolean;
  inputValue: string;
  backupString: string;
};

export const ConversationNameInput = (props: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ 
    inputSelected: false, showUpdateBtn: false, inputValue: "Anonymous", backupString: "Anonymous" 
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
  const selectNameInput = (): void => {
    setLocalState({ ...localState, inputSelected: true, showUpdateBtn: true });
  };
  const handleInputChange = (e): void => {
    setLocalState({ ...localState, inputValue: e.target.value });
  };
  const updateConversationName = (e): void => {
    e.stopPropagation();
    setLocalState({ ...localState, inputSelected: false, showUpdateBtn: false });
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
      
      <div className={ `${styles.updateConversationNameBtn} ${ localState.showUpdateBtn ? styles.conversationNameBtnShow : ""}` } onClick={ updateConversationName } ref={ componentRef }>
        Update
      </div>
    </div>
  )
};