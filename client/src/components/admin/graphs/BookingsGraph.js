import React, { userState, useState } from "react";
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries
} from 'react-vis';
// additional components //
import { GraphDetail } from "./helper_components/GraphHelpers";

const BookingGraph = (props) => {

  const fetchData = () => {
    
  }

  // this should be coming from a database eventually //
  return (
    <React.Fragment>
      <XYPlot width={500} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          data={[
            { x: 1, y: 123 },
            { x: 2, y: 64 },
            { x: 3, y: 132 },
            { x: 4, y: 111 },
            { x: 5, y: 98 },
            { x: 6, y: 100 },
            { x: 7, y: 134 },
            { x: 8, y: 56 },
            { x: 9, y: 46 },
            { x: 10, y: 101 },
            { x: 11, y: 22 },
            { x: 12, y: 134 },
          ]}/>
      </XYPlot>
    </React.Fragment>
  )
};

export default BookingGraph;