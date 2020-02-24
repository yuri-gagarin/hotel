import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, Segment } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

import { adminRoutes } from "../../../routes/appRoutes";

const AdminNavMenu = (props) =>  {
  const [active, setActiveItem] = useState({ activeItem: "home" })
  const { history, logoutUser } = props;

  useEffect(() => {
    history.push(adminRoutes.ADMIN_DASH);
  }, []);

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
      case "rooms": {
        history.push("/admin/rooms");
        break;
      }
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
      return { ...state, activeItem: name };
    });
  };
  const _logoutUser = (e) => {
    // todo for logout functionality //
    logoutUser(e)
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
        name='rooms'
        active={active.activeItem === 'rooms'}
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
          onClick={_logoutUser}
        />
      </Menu.Menu>
    </Menu>   
  );
};

// PropTypes validation //
AdminNavMenu.propTypes = {
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default withRouter(AdminNavMenu);

