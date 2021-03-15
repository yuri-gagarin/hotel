import React from "react";
// semantic ui components //
import { 
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
// css //
import styles from "./css/defaultDisplay.module.css";

const DefaultDisplay = () => {

  return (
    <div className={ styles.defaultDisplay }>
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name="file image outline" />
          You do not have any rooms created
        </Header>
        Any rooms you create for your hotel will be displayed here
      </Segment>
    </div>
  )
};  

export default DefaultDisplay;