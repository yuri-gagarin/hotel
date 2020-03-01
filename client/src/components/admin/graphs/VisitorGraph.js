import React, { userState, useState } from "react";
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines
} from 'react-vis';

const graphDetail = {
  height: "auto",
  width: "auto",
  border: "1px solid grey",
  backgroundColor: "rgb(50, 125, 168)",
  position: "fixed",
  textAlign: "center",
  display: "none",
}
const graphDetailText = {
  color: "white",
  fontWeight: "bold",
  padding: "0.5em"
}

const GraphDetail = (props) => {
  const { detailOpen } = props;
  const { month = "None", visitors = "None" } = props.dataPointValue;
  return (
    <div style={graphDetail} id="visitorGraphDetail">
      <span style={graphDetailText}>{month}: </span>
      <span style={graphDetailText}>{visitors} Visitors</span>
    </div>
  );
 
}

const VisitorGraph = (props) => {
  const [ mouseCoordinates, setMouseCoordinates ] = useState({ x: null, y: null });
  const [ dataPointValue, setDataPointValue ] = useState({ month: null, visitors: null });

  const detailElement = document.getElementById("visitorGraphDetail");    

  const handleMouseHover = (datapoint, e) => {
    setMouseCoordinates({
      ...mouseCoordinates,
      x: e.event.pageX,
      y: e.event.pageY
    });
    setDataPointValue({
      ...dataPointValue,
      month: datapoint.x,
      visitors: datapoint.y
    });
    let positionX = e.event.pageX;
    let positionY = e.event.pageY;
    detailElement.style.left = `${positionX}px`;
    detailElement.style.top = `${positionY - 35}px`;
    detailElement.style.display = "block";
  };

  const handleMouseOut = (data, e) => {
    detailElement.style.display = "none";
    setDataPointValue({});
  };

  return (
    <React.Fragment>
      <GraphDetail dataPointValue={dataPointValue} />
      <XYPlot
        width={500}
        height={300}
        xType="ordinal"
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <VerticalBarSeries
          color="rgb(50, 158, 168)"
          onValueMouseOver={handleMouseHover}
          onValueMouseOut={handleMouseOut}
          data={[
            { x: 'Jan', y: 123 },
            { x: 'Feb', y: 10 },
            { x: 'Mar', y: 10 },
            { x: 'Apr', y: 10 },
            { x: 'May', y: 10 },
            { x: 'Jun', y: 10 },
            { x: 'Jul', y: 10 },
            { x: 'Aug', y: 10 },
            { x: 'Sep', y: 10 },
            { x: 'Oct', y: 10 },
            { x: 'Nov', y: 10 },
            { x: 'Dec', y: 10 },
          ]}/>
        <XAxis tickLabelAngle={-45} />
        <YAxis />
    </XYPlot> 
    </React.Fragment>
  )
};

export default VisitorGraph;