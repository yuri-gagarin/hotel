import React from "react";

class MainHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-lead-in">Premier Kiev</div>
            <div className="intro-heading text-uppercase">Welcome</div>
            <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
          </div>
        </div>
      </header>
    );
  }
};

export default MainHeaderComponent;