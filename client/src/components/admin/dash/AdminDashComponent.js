import React, { useState, useRef, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Input, Select, TextArea, Icon, Segment } from "semantic-ui-react";
// styles and images //
import { 
  informationHolder, informationHeader, informationText,
  infoButton, infoColumn
} from "./style/styles";
// redux imports //
import { connect } from "react-redux";
import { handleFetchContactPosts } from "./../../../redux/actions/contactPostActions";
import { fetchRooms } from "./../../../redux/actions/roomActions";
import { fetchAllConversations } from "./../../../redux/actions/conversationActions";
// aditional component imports //
import VisitorGraph from "../graphs/VisitorGraph";
import BookingGraph from "../graphs/BookingsGraph";
import FooterMenu from "./../footer/FooterMenu";

const optionsHolder = {
  border: "2px solid red"
}

const InformationHolder = (props) => {
  const { number = 0 } = props;
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
    adminState, adminConvState, roomState,  appGeneralState,
    contactPostState, serviceState, history
  } = props;
  // admin redux functions //
  const {
    fetchContactPosts, fetchRooms, fetchAllConversations 
  } = props;

  const { firstName } = adminState;

  useEffect(() => {
    // fetch all the related information to the dash component //
    Promise.all([
      fetchContactPosts(),
      fetchRooms(),
      fetchAllConversations()
    ]);
  }, []);
  // navigational buttons //
  const goToContactPosts = () => {
    history.push("/admin/contactPosts");
  };
  const goToRooms = () => {
    history.push("/admin/rooms");
  }
  const goToMessenger = () => {
    history.push("/admin/messages");
  }
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h4>Hello {firstName}</h4>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} style={{ padding: 0 }}>
          <Segment style={{ height: "75vh", overflowY: "scroll", overflowX: "hidden" }}>
            <Grid.Row columns={2}>
              <Grid.Column style={infoColumn}>
                <div>
                  <div style={informationHeader}>
                    <h4>Information Requests</h4>
                    <p>New Information Requests</p>
                  </div>
                  <InformationHolder number={contactPostState.numberOfPosts} />
                  <Button basic color="green" style={infoButton} onClick={goToContactPosts}>Show Requests</Button>
                </div>
              </Grid.Column>
              <Grid.Column style={infoColumn}>
                <div>
                  <div style={informationHeader}>
                    <h4>Rooms</h4>
                    <p>How many different types of rooms displayed to clients</p>
                  </div>
                  <InformationHolder number={roomState.numberOfRooms} />
                  <Button basic color="green" style={infoButton} onClick={goToRooms}>Show Hotel Rooms</Button>
                </div>
              </Grid.Column>
              <Grid.Column style={infoColumn}>
                <div>
                  <div style={informationHeader}>
                    <h4>Instant Messenger</h4>
                    <p>Live conversations with visiting clients</p>
                  </div>
                  <InformationHolder number={adminConvState.numberOfConversations} />
                  <Button basic color="green" style={infoButton} onClick={goToMessenger}>Open Messenger</Button>
                </div>
              </Grid.Column>
              <Grid.Column style={infoColumn}>
                <div>
                  <div style={informationHeader}>
                    <h4>Additional Services</h4>
                    <p>Additional services offered in hotel</p>
                  </div>
                  <InformationHolder number={serviceState.numberOfServices} />
                  <Button basic color="green" style={infoButton} onClick={goToMessenger}>Open Services</Button>
                </div>
              </Grid.Column>
              <Grid.Column style={infoColumn}>
                <div>
                  <div style={informationHeader}>
                    <h4>Hotel Posts</h4>
                    <p>Hotel posts and news from admin</p>
                  </div>
                  <InformationHolder />
                  <Button basic color="green" style={infoButton}>Open Posts</Button>
                </div>
               
              </Grid.Column>
            </Grid.Row>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment style={{ height: "75vh", overflowY: "scroll", overflowX: "hidden" }}>
            <Segment>
              <div style={{textAlign: "center"}}>Visitor Count</div>
              <VisitorGraph />
            </Segment>
            <Segment>
              <div style={{ textAlign: "center" }}>Bookings</div>
              <BookingGraph />
            </Segment>
          </Segment>
         
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16} style={{ paddingLeft: 0 }}>
          < FooterMenu />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
      
  );
};
// Proptypes Validations //
AdminDashComponent.propTypes = {
  history: PropTypes.object.isRequired,
  adminState: PropTypes.object.isRequired,
  adminConvState: PropTypes.object.isRequired,
  roomState: PropTypes.object.isRequired,
  appGeneralState: PropTypes.object.isRequired,
  contactPostState: PropTypes.object.isRequired,
  serviceState: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchContactPosts: () => handleFetchContactPosts(dispatch),
    fetchAllConversations: () => fetchAllConversations(dispatch),
    fetchRooms: () => fetchRooms(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashComponent);