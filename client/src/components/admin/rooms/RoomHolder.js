import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const RoomHolder = (props) => {
  const { room } = props;
  console.log(room)
  const firstRoomimagePath = room.images[0].path;
  const imgSourcePath = firstRoomimagePath.split("/");
  const imgPath = "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>{room.roomType}</Card.Header>
          <Image
            size='small'
            src={imgPath}
          />
          <Card.Description>
            {room.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Open
            </Button>
            <Button basic color='red'>
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default RoomHolder