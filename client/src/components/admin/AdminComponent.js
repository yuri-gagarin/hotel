import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, List } from "semantic-ui-react";

import AdminNavComponent from "./nav/AdminNav";

const MessagesComponent = (props) => {
  const openConversation = () => {
    console.info("opening");
  }
  return (
    <Container>
      <List divided relaxed>
        <List.Item>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content onClick={openConversation}>
            <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
            <List.Description as='a'>Updated 10 mins ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
            <List.Description as='a'>Updated 22 mins ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
            <List.Description as='a'>Updated 34 mins ago</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  );
};

const AdminComponent = (props) => {

  return (
    <Grid stackable padded style={{paddingLeft: "1em", paddingRight: "1em"}}>
      <Grid.Row>
        <Grid.Column width={16}>
          <AdminNavComponent />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <h3>Dash Column</h3>
        </Grid.Column>
        <Grid.Column width={9}>
          <h3>Main Column</h3>
        </Grid.Column>
        <Grid.Column width={3}>
          <MessagesComponent />
        </Grid.Column>
      </Grid.Row>
      
    </Grid>
  )
};
// proptypes checking //
AdminComponent.propTypes = {

};

export default AdminComponent;