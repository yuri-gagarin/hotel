import React, { useState, useRef, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Input, Select, TextArea, Icon } from "semantic-ui-react";
// redux imports //
import { connect } from "react-redux";
import { fetchContactPosts } from "./../../../redux/actions/contactPostActions";
import { fetchRooms } from "./../../../redux/actions/roomActions";
import { fetchAllConversations } from "./../../../redux/actions/conversationActions";
// aditional component imports //
import MessagesComponent from "../conversations/MessagesComponent";
import VisitorGraph from "../graphs/VisitorGraph";

const informationHolder = {
  position: "relative",
  margin: "auto",
  height: "100px",
  width: "100px",
  borderRadius: "50px",
  textAlign: "center", 
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
  backgroundColor: "rgb(66, 190, 252)",
  '&:hover': {
    backgroundColor: "blue"
  }
}
const informationHeader = {
  height: "100px",
  padding: "0.5em",
  marginBottom: "1em",
  border: "1px solid grey",
  borderRadius: "5px",
  textAlign: "center"
}
const informationText = {
  position: "absolute",
  width: "100%",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "3em"
}

const infoButton = {
  marginTop: "0.5em",
}

const infoColumn = {
  //borderTop: "1px solid grey", 
  //borderBottom: "1px solid grey", 
  padding: "0.5em", 
  textAlign: "center" 
}

const InformationHolder = (props) => {
  return (
  <div style={{ display: "flex" }}>
    <div style={informationHolder}>
      <p style={informationText}>5</p>
    </div>
  </div>
  )
}

const AdminDashComponent = (props) => {
  const { 
    adminState, 
    contactPostState, 
    adminRoomState, 
    conversationState 
  } = props;
  const {fetchContactPosts, fetchRooms, fetchAllConversations } = props;
  const { firstName } = adminState;

  useEffect(() => {
    // fetch all the related information to the dash component //
    fetchContactPosts();
    fetchRooms();
    fetchAllConversations();

  }, [])

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h4>Hello {firstName}</h4>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} style={infoColumn}>
          <div style={informationHeader}>
            <h4>Information Requests</h4>
            <p>New Information Requests</p>
          </div>
          <InformationHolder />
          <Button basic color="green" style={infoButton}>Show Requests</Button>
        </Grid.Column>
        <Grid.Column width={4} style={infoColumn}>
          <div style={informationHeader}>
            <h4>Rooms</h4>
            <p>Types of rooms displayed:</p>
          </div>
          <InformationHolder />
          <Button basic color="green" style={infoButton}>Show Hotel Rooms</Button>
        </Grid.Column>
        <Grid.Column width={8}>
          <div style={{textAlign: "center"}}>Visitor Count</div>
          <VisitorGraph />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} style={infoColumn}>
            <div style={informationHeader}>
              <h4>Instant Messenger</h4>
              <p>Live conversations with visiting clients</p>
            </div>
            <InformationHolder />
            <Button basic color="green" style={infoButton}>Open Messenger</Button>
          </Grid.Column>
        <Grid.Column width={4} style={infoColumn}>
          <div style={informationHeader}>
            <h4>Hotel Posts</h4>
            <p>Hotel posts and news from admin</p>
          </div>
          <InformationHolder />
          <Button basic color="green" style={infoButton}>Open Posts</Button>
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column width={4} style={{border: "2px solid red"}}>
        </Grid.Column>


      </Grid.Row>
    </React.Fragment>
      
  );
};
// Proptypes Validations //
AdminDashComponent.propTypes = {
  adminState: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchContactPosts: () => fetchContactPosts(dispatch),
    fetchAllConversations: () => fetchAllConversations(dispatch),
    fetchRooms: () => fetchRooms(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashComponent);