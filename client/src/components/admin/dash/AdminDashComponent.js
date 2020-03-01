import React, { useState, useRef, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Input, Select, TextArea, Icon } from "semantic-ui-react";
// styles and images //
import { 
  informationHolder, informationHeader, informationText,
  infoButton, infoColumn
} from "./style/styles";
// redux imports //
import { connect } from "react-redux";
import { fetchContactPosts } from "./../../../redux/actions/contactPostActions";
import { fetchRooms } from "./../../../redux/actions/roomActions";
import { fetchAllConversations } from "./../../../redux/actions/conversationActions";
// aditional component imports //
import VisitorGraph from "../graphs/VisitorGraph";



const InformationHolder = (props) => {
  const { number = 0 } = props;
  console.log(number)
  return (
  <div style={{ display: "flex" }}>
    <div style={informationHolder}>
      <div style={informationText}>
        <div>{number}</div>
        <div style={{fontSize: "0.5em", marginTop: "-10px"}}>Active</div>
      </div>
    </div>
  </div>
  )
}

const AdminDashComponent = (props) => {
  // admin states //
  const { 
    adminState, adminConvState, adminRoomState,  appGeneralState,
    contactPostState
  } = props;
  // admin redux functions //
  const {
    fetchContactPosts, fetchRooms, fetchAllConversations 
  } = props;

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
            <p>How many different types of rooms displayed to clients</p>
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
            <InformationHolder number={adminConvState.numberOfConversations} />
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
  adminState: PropTypes.object.isRequired,
  adminConvState: PropTypes.object.isRequired,
  adminRoomState: PropTypes.object.isRequired,
  appGeneralState: PropTypes.object.isRequired,
  contactPostState: PropTypes.object.isRequired
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