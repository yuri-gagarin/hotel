import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, Segment } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

import { adminRoutes } from "../../../routes/appRoutes";

const AdminNavMenu = (props) =>  {
  const [active, setActiveItem] = useState("home");
  const { history, logoutUser } = props;

  useEffect(() => {
    history.push(adminRoutes.ADMIN_DASH);
  }, []);
  useEffect(() => {
    const pathName = history.location.pathname;
    // set the navbar active item based on history //
    switch (pathName) {
      case adminRoutes.ADMIN_MESSAGES: {
        setActiveItem("messages");
        break;
      };
      case adminRoutes.ADMIN_ROOMS: {
        setActiveItem("rooms");
        break;
      };
      case adminRoutes.ADMIN_POSTS: {
        setActiveItem("posts");
        break;
      };
      case adminRoutes.ADMIN_CONTACT_POSTS: {
        setActiveItem("contactRequests");
        break;
      };  
      default: {
        setActiveItem("home");
      };
    }
    
  }, [history.location]);

  const handleMenuClick = (e, { name }) => {
    //console.log(name);
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
      case "contactRequests": {
        history.push("/admin/contactPosts");
        break;
      }
      case "regulate users": {
        history.push(adminRoutes.ADMIN_REGULATE_USERS);
        break;
      };
      default: {
        history.push(adminRoutes.ADMIN_DASH);
      }
    }
    setActiveItem(name);
  };
  const _logoutUser = (e) => {
    // todo for logout functionality //
    logoutUser(e)
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='home'
        active={active === "home"}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='messages'
        active={active === 'messages'}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='rooms'
        active={active === 'rooms'}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='posts'
        active={active === 'posts'}
        onClick={handleMenuClick}
      />
      <Menu.Item 
        name='contactRequests'
        active={active === "contactRequests"}
        onClick={handleMenuClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item 
          name="regulate users"
          active={active === "regulate users"}
          onClick={handleMenuClick}
        />
        <Menu.Item
          name='logout'
          active={active === 'logout'}
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

