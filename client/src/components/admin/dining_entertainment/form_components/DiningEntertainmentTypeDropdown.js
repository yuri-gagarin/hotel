import React from 'react';
import PropTypes from "prop-types";
// smenatic react //
import { Dropdown } from 'semantic-ui-react';
// 

const options = [
  { key: 1, text: "Restaurant", value: "restaurant" },
  { key: 2, text: "Night Club", value: "nightClub" },
  { key: 3, text: "Cafe", value: "cafe" },
]

const DiningEntertainmentTypeDropdown = ({ handleSelect, handleClear }) => {
  

  return (
    <Dropdown 
      clearable 
      options={options} 
      selection 
      onChange={ handleSelect }
      placeholder={ "Select tyoe..." }
    />
  )
};

DiningEntertainmentTypeDropdown.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired
};

export default DiningEntertainmentTypeDropdown;