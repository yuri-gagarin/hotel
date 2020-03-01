import React from "react";
// styles //
import { graphDetail, graphDetailText } from "../style/styles";

export const GraphDetail = (props) => {
  const { month = "None", visitors = "None" } = props.dataPointValue;
  return (
    <div style={graphDetail} id="visitorGraphDetail">
      <span style={graphDetailText}>{month}: </span>
      <span style={graphDetailText}>{visitors} Visitors</span>
    </div>
  );
};