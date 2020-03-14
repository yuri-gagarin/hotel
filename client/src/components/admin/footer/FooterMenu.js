import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

const  AdminFooterMenu = (props) => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };


  return (
    
    <Menu style={{ width: "100%" }}>
      { console.log(activeItem)}
      <Menu.Item
        name='editorials'
        active={activeItem === 'editorials'}
        content='Editorials'
        onClick={handleItemClick}
      />

      <Menu.Item
        name='reviews'
        active={activeItem === 'reviews'}
        content='Reviews'
        onClick={handleItemClick}
      />

      <Menu.Item
        name='upcomingEvents'
        active={activeItem === 'upcomingEvents'}
        content='Upcoming Events'
        onClick={handleItemClick}
      />
    </Menu>
  );
};

export default AdminFooterMenu;