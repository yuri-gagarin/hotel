// @flow
import * as React from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
// types //
import type { DiningEntertainmentState, DiningEntModelData } from "../../../redux/reducers/dining_entertainment/flowTypes";
// helpers //
import { setImagePath, trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  diningEntModel: DiningEntModelData,
  openDiningEntModel: (modelId: string) => void,
  deleteDiningEntModel: (modelIdToDelete: string) => Promise<boolean>
}
const DiningEntertainmentContainer = ({ diningEntModel, openDiningEntModel, deleteDiningEntModel } : Props): React.Node => {

  return (
    <Card >
      <Card.Content textAlign="center">
        <Card.Header>{diningEntModel.title}</Card.Header>
        <Image
          rounded
          size="big"
          src={setImagePath(diningEntModel.images[0].path)}
        />
        <Card.Description>
          { trimStringToSpecificLength(diningEntModel.description, 15)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => openDiningEntModel(diningEntModel._id)}>
            Open
          </Button>
          <Button basic color='red' onClick={() => deleteDiningEntModel(diningEntModel._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default DiningEntertainmentContainer;