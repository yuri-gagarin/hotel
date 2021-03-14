import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid, Image
} from "semantic-ui-react";
// additional component imports //
import EditDiningEntertainmentDisplay from "./EditDiningEntertainmentDisplay";

const style = {
  metaStyle: {
    border: "2px solid grey",
    padding: "0.5em",
    marginRight: "0.5em",
    marginBottom: "0.5em",
    display: "inline-block"
  },
  diningModelDescription: {
    border: "2px solid grey",
    padding: "0.5em",
    marginTop: "0.5em",
    marginBottom: "1em",
    fontSize: "18px",
  },
  diningModelImage: {
    border: "1px solid grey",
    marginRight: "0.5em",
    marginBottom: "1em",
    display: "inline-block"
  },
  formButton: {
    marginTop: "1em",
    marginBottom: "1em"
  }
};
const {
  metaStyle, diningModelDescription, diningModelImage, formButton
} = style;

const normalizePath = (uploadPath) => {
  const imgSourcePath = uploadPath.split("/");
  return  "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
};

const DiningEntertainmentDisplay = (props) => {
  const { diningModel, history } = props;
  const { images } = diningModel;

  // local form state //
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    // close the diningModel form on state change //
    setFormOpen(false);
  }, [diningModel]);

  useEffect(() => {
    // will scroll down the document when edit diningModel form is open //
    if (formOpen) {
      window.scrollTo(0,document.body.scrollHeight);
    } else {
      window.scrollTo(0, 0);
    }
  }, [formOpen]);

  const openForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Grid.Column width={14}>
      <div>
          <h4>Details</h4>
          <div>
            <div style={metaStyle}>Title: {diningModel.diningModelTitle}</div>
            <div style={metaStyle}>Hours: {diningModel.hours}</div>
          </div>
          <h4>Description</h4>
          <div style={diningModelDescription}>{diningModel.description}</div>
          <hr />
            <div>Uploaded Images</div>
          <hr />
          {
            images.map((img) => <Image key={img._id} style={diningModelImage} size='medium' src={normalizePath(img.path)} />)
          }
      </div>
      {
        formOpen ? <Button style={formButton} onClick={openForm}>Close</Button> : <Button style={formButton} onClick={openForm}>Edit Dining/Entertainment option</Button>
      }
      { formOpen ? <EditDiningEntertainmentDisplay history={history} diningModel={diningModel} /> : null }
    </Grid.Column>
  );
};
// PropTypes validations //
DiningEntertainmentDisplay.propTypes = {
  diningModel: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default DiningEntertainmentDisplay;