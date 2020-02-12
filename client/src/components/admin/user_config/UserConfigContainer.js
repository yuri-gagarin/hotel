import React from "react";
import PropTypes from "prop-types";

const UserConfigContainer = (props) => {

    return (
      <React.Fragment>
        <Grid.Row>
          <h5>Hello from Users Config</h5>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Segment>1</Segment>
          </Grid.Column>
          <Grid.Column width={9}>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
};

// PropTypes validations //
UserConfigContainer.propTypes = {

};

export default UserConfigContainer;