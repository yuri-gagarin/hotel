// @flow
import * as React from "react";
import { Button, Grid, Image } from "semantic-ui-react";
// additional component imports //
import EditDiningEntertainmentDisplay from "./EditDiningEntertainmentDisplay";
// types //
import type { DiningEntModelData, DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/diningEntertainmentDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  diningEntState: DiningEntertainmentState,
  history: RouterHistory
}
const DiningEntertainmentDisplay = ({ diningEntState, history }: Props): React.Node => {
  const { useState, useEffect } = React;
  // local form state //
  const [formOpen, setFormOpen] = useState(false);
  const { diningEntModelData } = diningEntState;
  useEffect(() => {
    // close the diningModel form on state change //
    setFormOpen(false);
  }, [ diningEntModelData ]);

  useEffect(() => {
    // will scroll down the document when edit diningModel form is open //
    if (formOpen && document.body) {
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      window.scrollTo(0, 0);
    }
  }, [ formOpen ]);

  const openForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Grid.Column width={15}>
      <div>
          <h4>Details</h4>
          <div>
            <div className={ styles.metaStyle }>Title: { diningEntModelData.title }</div>
            <div className={ styles.metaStyle }>Hours: { diningEntModelData.hours }</div>
          </div>
          <h4>Description</h4>
          <div className={ styles.diningModelDescription }>{diningEntModelData.description}</div>
          <hr />
            <div>Uploaded Images</div>
          <hr />
          {
            diningEntModelData.images.map((img) => <Image key={img._id} className={ styles.diningModelImage } size='medium' src={ setImagePath(img.path) } />)
          }
      </div>
      {
        formOpen ? <Button className={ styles.formButton } onClick={ openForm }>Close</Button> : <Button className={ styles.formButton } onClick={openForm}>Edit Dining/Entertainment option</Button>
      }
      { formOpen ? <EditDiningEntertainmentDisplay history={history} diningEntState={ diningEntState } /> : null }
    </Grid.Column>
  );
};

export default DiningEntertainmentDisplay;