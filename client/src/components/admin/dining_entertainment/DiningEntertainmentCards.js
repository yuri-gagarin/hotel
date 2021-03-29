// @flow
import * as React from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
//
import { CardOnlineStatusBlinkers } from "../shared/CardOnlineStatusBlinkers";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
// types //
import type { DiningEntertainmentState, DiningEntModelData } from "../../../redux/reducers/dining_entertainment/flowTypes";
// styles and css //
import styles from "./css/diningEntertainmentCards.module.css";
// helpers //
import { setImagePath, trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  diningEntState: DiningEntertainmentState,
  openDiningEntModel: (modelId: string) => void,
  deleteDiningEntModel: (modelIdToDelete: string) => void
}
export const DiningEntertainmentCards = ({ diningEntState, openDiningEntModel, deleteDiningEntModel } : Props): React.Node => {
  const { createdDiningEntModels } = diningEntState;

  const extractImagePath = (modelData: DiningEntModelData): string => {
    if (modelData.images && modelData.images.length > 0) {
      return setImagePath(modelData.images[0].path);
    } else {
      return setImagePath();
    }
  }
  return (
    <Card.Group stackable itemsPerRow="3">
    {
      createdDiningEntModels.map((diningModel) => {
        return ( 
          <Card key={ diningModel._id }>
            <Card.Content textAlign="center">
              <Card.Header>{diningModel.title}</Card.Header>
              <Image
                rounded
                size="medium"
                src={extractImagePath(diningModel)}
              />
            </Card.Content>
            <Card.Content>
              <Card.Description>
                { trimStringToSpecificLength(diningModel.description, 50)}
              </Card.Description>
            </Card.Content>
            <Card.Content className={ styles.hoursContent }>
              <span>Published hours:</span>
              <span>{ diningModel.hours }</span>
            </Card.Content>
            <Card.Content>
              <CardOnlineStatusBlinkers live={ true } />
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic content="Open" icon="file" color='green' onClick={() => openDiningEntModel(diningModel._id)} />
                <Button basic content="Delete" icon="trash" color='red' onClick={() => deleteDiningEntModel(diningModel._id)} />
              </div>
            </Card.Content>
          </Card>
        );
      })
    }
    </Card.Group>
    
  );
};