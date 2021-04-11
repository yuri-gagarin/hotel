// @flow
import * as React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";

type Props = {
  customHeaderMessage?: string,
  customContentMessage?: string
};

export const GeneralNoModelsSegment = ({ customHeaderMessage, customContentMessage } : Props): React.Node => {

  return (
    <Segment placeholder textAlign="center" style={{ height: "100%" }}>
      <Header icon>
        <Icon name='search' />
        {
          customHeaderMessage ? customHeaderMessage : "We don't have any files matching your query."
        }
       
      </Header>
      { customContentMessage ? customContentMessage : "Add some files by click create new above .."}
    </Segment>
  );
};