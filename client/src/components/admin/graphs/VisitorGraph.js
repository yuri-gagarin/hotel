import React, { userState, useState } from "react";
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines
} from 'react-vis';
// additional components //
import { GraphDetail } from "./helper_components/GraphHelpers";

const VisitorGraph = (props) => {
  const [ mouseCoordinates, setMouseCoordinates ] = useState({ x: null, y: null });
  const [ dataPointValue, setDataPointValue ] = useState({ month: null, visitors: null });

  const handleMouseHover = (datapoint, e) => {
    const detailElement = document.getElementById("visitorGraphDetail");    
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
    const detailElement = document.getElementById("visitorGraphDetail");    
    detailElement.style.display = "none";
    setDataPointValue({});
  };
  // this should be coming from a database eventually //
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
            { x: 'Feb', y: 64 },
            { x: 'Mar', y: 132 },
            { x: 'Apr', y: 111 },
            { x: 'May', y: 98 },
            { x: 'Jun', y: 100 },
            { x: 'Jul', y: 134 },
            { x: 'Aug', y: 56 },
            { x: 'Sep', y: 46 },
            { x: 'Oct', y: 101 },
            { x: 'Nov', y: 22 },
            { x: 'Dec', y: 134 },
          ]}/>
        <XAxis tickLabelAngle={-45} />
        <YAxis />
    </XYPlot> 
    </React.Fragment>
  )
};

export default VisitorGraph;