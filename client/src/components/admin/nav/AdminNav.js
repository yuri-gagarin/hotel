import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Segment } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

import { adminRoutes } from "../../../routes/appRoutes";

const AdminNavMenu = (props) =>  {
  const [active, setActiveItem] = useState({ activeItem: "home" })
  const [loading, setLoading] = useState(false);
  const { history } = props;

  const handleMenuClick = (e, { name }) => {
    
    switch (name) {
      case "home": {
        history.push(adminRoutes.ADMIN_DASH);
        break;
      };
      case "messages": {
        history.push(adminRoutes.ADMIN_MESSAGES);
        break;
      };
      case "posts": {
        history.push(adminRoutes.ADMIN_POSTS);
        break;
      };
      case "regulate users": {
        history.push(adminRoutes.ADMIN_REGULATE_USERS);
        break;
      };
      default: {
        history.push(adminRoutes.ADMIN_DASH);
      }
    }
    setActiveItem((state) => {
      console.log(state);
      return { ...state, activeItem: name };
    });
  };
  const handleLogout = () => {
    // todo for logout functionality //
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='home'
        active={active.activeItem === "home"}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='messages'
        active={active.activeItem === 'messages'}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='posts'
        active={active.activeItem === 'posts'}
        onClick={handleMenuClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item 
          name="regulate users"
          active={active.activeItem === "regulate users"}
          onClick={handleMenuClick}
        />
        <Menu.Item
          name='logout'
          active={active.activeItem === 'logout'}
          onClick={handleLogout}
        />
      </Menu.Menu>
    </Menu>   
  );
};

// PropTypes validation //
AdminNavMenu.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AdminNavMenu);
