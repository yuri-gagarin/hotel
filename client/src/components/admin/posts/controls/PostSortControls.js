// @flow 
import * as React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
// styles //
import styles from "./css/postSortControls.module.css";

type LocalState = {
  dropDownText: "Newest" | "Oldest" | "Most Read" | "Least Read";
}
export const PostSortControls = (): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ dropDownText: "Newest" });

  const selectDropDownValue = (_, data: any): void => {
    setLocalState({ dropDownText: data.value });
  };
  
  return (
    <Menu>
      <Menu.Item>
        <Dropdown text={ localState.dropDownText }>
          <Dropdown.Menu>
            <Dropdown.Item value="Newest" onClick={ selectDropDownValue }>
              Newest
              <Icon className={ styles.postDropdownIcon } name="clock"></Icon>
            </Dropdown.Item>
            <Dropdown.Item value="Oldest" text="Oldest" onClick={ selectDropDownValue }>
              Oldest
              <Icon className={ styles.postDropdownIcon } name="clock"></Icon>
            </Dropdown.Item>   
            <Dropdown.Divider /> 
            <Dropdown.Item value="Most Read" onClick={ selectDropDownValue }>
              Most Read
              <Icon className={ styles.postDropdownIcon } name="book"></Icon>
            </Dropdown.Item>
            <Dropdown.Item value="Least Read" onClick={ selectDropDownValue }>
              Least Read
              <Icon className={ styles.postDropdownIcon } name="book"></Icon>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};