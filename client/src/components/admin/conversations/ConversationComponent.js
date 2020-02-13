import React from "react";
import PropTypes from "prop-types";
import { 
  Comment, 
  Container,
  Header,
  Icon,
  Button
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const style = {
  convoContainerStyle: {
    cursor: "pointer", 
    border: "1px solid grey", 
    padding: "1em"
  },
  convoDeleteBtn: { 
    position: "absolute",
    right: 0,
    top: 0,
    padding: "0.5em",
    marginTop: "0.25em",
    color: "white"
  }
};

const DeleteConvoBtn = (props) => {
  const confirmDeleteConversation = () => {
    alert("Are You Sure?");
  }
  return(
    <Button 
      icon 
      style={style.convoDeleteBtn} 
      color="red" 
      onClick={confirmDeleteConversation}
    >
      <Icon name="trash"></Icon>
      <span>Delete</span>
    </Button>
  )
}

const ConversationComponent = (props) => {
  const messages = props.messages || [];
  const handleConvoOpen = () => {
    console.log("clicked");
  }

  const switchDanger = () => {
    console.log("danger")
  };
  return (
      <Comment.Group style={{overflow: "scroll", height: "100%", paddingRight: "1em"}}>
        <Header as='h3' style={{textAlign: "center"}}>
          Active Conversations
        </Header>

        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content style={{paddingTop: "0.5em"}}>
            <DeleteConvoBtn onMouseEnter={switchDanger}/>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Content>How artistic!</Comment.Content>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>

        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
        <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
          <Comment.Content>
            <DeleteConvoBtn/>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Content>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Content>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </Comment.Group>
      
  )
};
// PropTypes validation //
ConversationComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ConversationComponent);