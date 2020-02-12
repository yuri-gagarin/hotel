import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";


const ConversationComponent = (props) => {
  const messages = props.messages || [];
  return (
    <Container>
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>

        <Comment>
          <Comment.Avatar src='/images/avatar/small/matt.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Avatar src='/images/avatar/small/elliot.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Container>
  )
};
// PropTypes validation //
ConversationComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ConversationComponent);