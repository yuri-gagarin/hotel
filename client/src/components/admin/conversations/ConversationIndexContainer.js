// @flow 
import * as React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
// additional components //
import ConversationComponent from "./ConversationComponent";
import MessagesView from "./MessagesView";
// styles imports //
import { closeConvoButton } from "./styles/style";
import { withRouter } from "react-router-dom";
// redux imports  //
import { connect } from "react-redux";
import { handleOpenAdminConversation, handleCloseAdminConversation, handleFetchAdminConversations, handleDeleteAdminConversation, handleNewMessage } from "../../../redux/actions/adminConversationActions";
// flow types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { AdminConversationAction, AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// socket import //
import { socket } from "./../../../App";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";

const MessagesSplashScreen = (): React.Node => {
  return (
    <Grid.Column width={11}>
      <div className="messageArea">
        <div className="messageAreaTitle">
          <h1>Hotel Instant Messaging</h1>
          <p>Open a message to access a conversation</p>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
         </ul>
      </div>
    </Grid.Column>
  )
};

type WrapperProps = {|
  history: RouterHistory;
|};
type Props = {
  ...WrapperProps;
  adminState: any;
  adminConversationState: AdminConversationState;
  _handleOpenAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleCloseAdminConversation: () => void;
  _handleFetchAdminConversations: () => Promise<boolean>;
  _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleNewMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => Promise<Boolean>;
};
const ConversationIndexContainer = ({ history, adminState, adminConversationState, _handleOpenAdminConversation, _handleCloseAdminConversation, _handleFetchAdminConversations, _handleDeleteAdminConversation, _handleNewMessage }: Props): React.Node => {
    // redux state props //

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      socket.on("newClientMessage", (data: MessageData) => {
       _handleNewMessage(data, adminConversationState);
    });

    _handleFetchAdminConversations();
    }
    return () => { mounted = false };
  }, []);

  const openConversation = (conversationId: string): void => {
    _handleOpenAdminConversation(conversationId, adminConversationState);
  };

  const closeConversation = (): void => {
    _handleCloseAdminConversation;
  };
  // TODO //
  // add a confirmation modal //
  const deleteConversation = (converstionId: string): void => {
    _handleDeleteAdminConversation
  };

  return (
    <React.Fragment>
      <Grid.Row style={{borderTop: "1px solid grey", borderBottom: "1px solid grey" }}>
        <Grid.Column width={5} style={{ height: "90vh", paddingLeft: "0.5em", paddingRight: 0 }}>
          <ConversationComponent 
            adminConversationState={ adminConversationState } 
            openConversation={ openConversation }
            closeConversation={ closeConversation }
            deleteConversation={ deleteConversation }
          />          
        </Grid.Column>
        {
          objectValuesEmpty(adminConversationState.activeConversation) 
          ? 
            <MessagesView 
              adminState={ adminState }
              adminConversationState={ adminConversationState }
              sendAdminMessage={ _handleNewMessage }
              closeConversation={ closeConversation }
            /> :
            <MessagesSplashScreen />
        }
        
      </Grid.Row>
      <Grid.Row>
        <div className="ui divider"></div>
      </Grid.Row>
    </React.Fragment>
  );
};
// connect functions //
const mapStateToProps = (state: RootState) => {
  return {
    adminState: state.adminState,
    adminConversationState: state.adminConversationState,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AdminConversationAction>) => {
  return {
  }
};  

export default (connect(mapStateToProps, mapDispatchToProps)(ConversationIndexContainer): React.AbstractComponent<WrapperProps>);