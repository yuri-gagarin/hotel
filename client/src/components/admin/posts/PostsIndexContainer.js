import React from "react";
import PropTypes from "prop-types";

const PostsIndexContainer = (props) => {

    return (
      <React.Fragment>
        <Grid.Row>
          <h5>Hello from Posts Index</h5>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>1</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
};

// PropTypes validations //
PostsIndexContainer.propTypes = {

};

export default PostsIndexContainer;