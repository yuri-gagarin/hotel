// @flow
import * as React from 'react';
// smenatic react //
import { Dropdown } from 'semantic-ui-react';
// 
import { capitalizeString } from "../../../helpers/displayHelpers";

const options = [
  { key: 1, text: "Restaurant", value: "restaurant" },
  { key: 2, text: "Lounge", value: "lounge" },
  { key: 3, text: "Cafe", value: "cafe" },
]

type Props = {
  selectedOption: string,
  handleSelect: () => void,
}
export const DiningEntertainmentTypeDropdown = ({ selectedOption, handleSelect } : Props): React.Node => {
  
  return (
    <Dropdown 
      labeled
      text={ capitalizeString(selectedOption) }
      placeholder={ selectedOption ? "" : "Select an option ..."}
      clearable 
      options={options} 
      selection 
      onChange={ handleSelect }
    />
  )
};
