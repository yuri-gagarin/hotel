import React from "react";
import PropTypes from "prop-types";
import { Comment, 
  Container, 
  List 
} from "semantic-ui-react";

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

export default MessagesComponent;