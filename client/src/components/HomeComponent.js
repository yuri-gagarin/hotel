import React from "react";
// component imports //
import NavigationComponent from "./navigation/NavigationComponent";
import MainHeaderComponent from "./main_header/MainHeaderComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <React.Fragment>
      <NavigationComponent />
      <MainHeaderComponent />
    </React.Fragment>
    );
  }
};

export default HomeComponent;