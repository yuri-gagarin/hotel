import React from "react";
// component imports //
import NavigationComponent from "./navigation/NavigationComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationComponent />
    );
  }
};

export default HomeComponent;