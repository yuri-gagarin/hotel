import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid, Image, Item, Segment, Container
} from "semantic-ui-react";
// additional component imports //
import EditServiceDisplay from "./EditServiceDisplay";

const style = {
  metaStyle: {
    border: "2px solid grey",
    padding: "0.5em",
    marginRight: "0.5em",
    marginBottom: "0.5em",
    display: "inline-block"
  },
  serviceDescription: {
    border: "2px solid grey",
    padding: "0.5em",
    marginTop: "0.5em",
    marginBottom: "1em",
    fontSize: "18px",
  },
  serviceImage: {
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
  metaStyle, serviceDescription, serviceImage, formButton
} = style;

const normalizePath = (uploadPath) => {
  const imgSourcePath = uploadPath.split("/");
  return  "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
};

const ServiceDisplay = (props) => {
  const { service, history } = props;
  const { images } = service;

  // local form state //
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    // close the service form on state change //
    setFormOpen(false);
  }, [service]);

  useEffect(() => {
    // will scroll down the document when edit service form is open //
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
            <div style={metaStyle}>Type: {service.type}</div>
            <div style={metaStyle}>Hours: {service.hours}</div>
            <div style={metaStyle}>Price: {service.price}</div>
          </div>
          <h4>Description</h4>
          <div style={serviceDescription}>{service.description}</div>
          <hr />
            <div>Uploaded Images</div>
          <hr />
          {
            images.map((img) => <Image key={img._id} style={serviceImage} size='medium' src={normalizePath(img.path)} />)
          }
      </div>
      {
        formOpen ? <Button style={formButton} onClick={openForm}>Close</Button> : <Button style={formButton} onClick={openForm}>Edit Service</Button>
      }
      { formOpen ? <EditServiceDisplay history={history} service={service} /> : null }
    </Grid.Column>
  );
};
// PropTypes validations //
ServiceDisplay.propTypes = {
  service: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default ServiceDisplay;