import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment } from "semantic-ui-react";

const PostsIndexContainer = (props) => {

    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <h5>Hello from Posts Index</h5>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Segment style={{height: "100px", width: "300px"}}>1</Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
};

// PropTypes validations //
PostsIndexContainer.propTypes = {

};

export default PostsIndexContainer;