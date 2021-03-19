// @flow
import * as React from "react";
import PropTypes from "prop-types";
// semantic ui react //
import {
  Button, Header, Icon, Image, Segment, Popup
} from "semantic-ui-react";
// additional component imports //
import EditServiceDisplay from "./EditServiceDisplay";
// types //
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/serviceDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const PopupWithButton = ({ contentString, buttonContent, buttonOnClick, color }) => {
  return (
    <Popup 
      content={ contentString }
      trigger={
        <Button content={ buttonContent } onClick={ buttonOnClick } color={ color ? color : "grey" }/>
      }
    />
  )
}

type Props = {
  service: ServiceData,
  history: RouterHistory
}
const ServiceDisplay = ({ service, history } : Props): React.Node => {
  const { images } = service;

  // local form state //
  const [formOpen, setFormOpen] = React.useState(false);

  React.useEffect(() => {
    // close the service form on state change //
    setFormOpen(false);
  }, [service]);

  React.useEffect(() => {
    // will scroll down the document when edit service form is open //
    if (formOpen && document.body) {
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      window.scrollTo(0, 0);
    }
  }, [formOpen]);

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <React.Fragment>
      <div className={ styles.serviceDisplayCol }>
        <div className={ styles.serviceDetailsDiv }>
          <h4>Details</h4>
          <div className={ styles.serviceDetail }><small>Type:</small><strong>{service.serviceType}</strong></div>
          <div className={ styles.serviceDetail }><small>Hours:</small><strong>{service.hours}</strong></div>
          <div className={ styles.serviceDetail }><small>Price:</small><strong>{service.price}</strong></div>
        </div>
        <div className={ styles.serviceDescriptionDiv }>
          <h4>Description</h4>
          <p>{service.description}</p>
        </div>
        <hr />
        <div className={ styles.serviceImagesDiv}>
          <h4>Uploaded Service Images</h4>
          {
            images.length > 0 
            ? 
              images.map((img) => <Image key={img._id} className={ styles.serviceImage } size='medium' src={ setImagePath(img.path) } />)
            : 
              <Segment placeholder className={ styles.defaultNoImagesSegment }>
                <Header icon>
                  <Icon name="image outline" />
                  No images are uploded for this service
                </Header>
                
              </Segment>
          }
        </div>
      </div>
      <div className={ styles.editServiceFormToggleDiv }>
      {
        formOpen 
        ? 
          <PopupWithButton contentString="Changes will not be saved" buttonContent="Close" buttonOnClick={ toggleForm } color="orange" />
        : 
          <PopupWithButton contentString="Edit current Service" buttonContent="Edit" buttonOnClick={ toggleForm } color="green" />
      }
      </div>
      { 
        formOpen ? <EditServiceDisplay history={history} service={service} /> : null 
      }
    </React.Fragment>
  );
};
// PropTypes validations //
ServiceDisplay.propTypes = {
  service: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default ServiceDisplay;