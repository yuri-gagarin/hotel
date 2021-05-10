import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Menu } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

import { adminRoutes } from "../../../routes/appRoutes";

const AdminNavMenu = (props) =>  {
  const [ active, setActiveItem ] = useState("home");
  const { history, logoutUser } = props;

  useEffect(() => {
    history.push(adminRoutes.ADMIN_DASH);
  }, []);
  useEffect(() => {
    const pathName = history.location.pathname;
    // set the navbar active item based on history //
    if(pathName.includes("messages")) {
      setActiveItem("messenger");
    } 
    else if (pathName.includes("rooms")) {
      setActiveItem("rooms");
    }
    else if (pathName.includes("dining_entertainment")) {
      setActiveItem("dining_and_entertainment");
    }
    else if (pathName.includes("posts")) {
      setActiveItem("posts");
    }
    else if (pathName.includes("contact_requests")) {
      setActiveItem("contact_requests");
    }
    else if(pathName.includes("services")) {
      setActiveItem("services");
    }
    else {
      setActiveItem("home");
    }
    
  }, [history.location]);

  const handleMenuClick = (e, { name }) => {
    switch (name) {
      case "home": {
        history.push(adminRoutes.ADMIN_DASH);
        break;
      };
      case "messenger": {
        history.push(adminRoutes.ADMIN_MESSAGES);
        break;
      };
      case "rooms": {
        history.push("/admin/rooms");
        break;
      }
      case "dining_and_entertainment": {
        history.push("/admin/dining_entertainment");
        break;
      }
      case "posts": {
        history.push(adminRoutes.ADMIN_POSTS);
        break;
      };
      case "services": {
        history.push("/admin/services");
        break;
      };
      case "contact_requests": {
        history.push("/admin/contact_requests");
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

  const goToHomepage = () => {
    history.push("/");
  };
  const _logoutUser = (e) => {
    // todo for logout functionality //
    logoutUser(e)
  };

  return (
    <Menu pointing secondary style={{ width: "100%" }}>
      <Menu.Item
        name='home'
        active={active === "home"}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='messenger'
        active={active === 'messenger'}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='rooms'
        active={active === 'rooms'}
        onClick={handleMenuClick}
      />
       <Menu.Item
        name="services"
        active={active === "services"}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name="dining_and_entertainment"
        active={active === "dining_and_entertainment"}
        onClick={handleMenuClick}
      />
      <Menu.Item
        name='posts'
        active={active === 'posts'}
        onClick={handleMenuClick}
      />
      <Menu.Item 
        name='contact_requests'
        active={active === "contact_requests"}
        onClick={handleMenuClick}
      />
      <Menu.Menu position='right'>
        <Button basic color="green" content="View Homepage" onClick={ goToHomepage } />
        <Button basic color="blue" content="Regulate Users" />
        <Button basic color="orange" content="Logout" />
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

