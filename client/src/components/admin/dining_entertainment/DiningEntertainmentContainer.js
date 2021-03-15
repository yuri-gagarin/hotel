import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const DiningEntertainmentContainer = (props) => {
  const { diningModel, openDiningModel, deleteDiningModel } = props;
  const diningModelId = diningModel._id;
  let firstDiningModelImagePath, imgSourcePath, imgPath;

  if (diningModel.images[0]) {
    firstDiningModelImagePath = diningModel.images[0].path;
    imgSourcePath = setImagePath(firstDiningModelImagePath);
  } else {
    imgPath = "/assets/images/dining/restaurant_stock3.jpeg";
  }
 
  return (
    <Card >
      <Card.Content textAlign="center">
        <Card.Header>{diningModel.title}</Card.Header>
        <Image
          rounded
          size="big"
          src={imgPath}
        />
        <Card.Description>
          {diningModel.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => openDiningModel(diningModelId)}>
            Open
          </Button>
          <Button basic color='red' onClick={() => deleteDiningModel(diningModelId)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default DiningEntertainmentContainer;