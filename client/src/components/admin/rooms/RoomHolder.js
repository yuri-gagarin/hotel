import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const RoomHolder = (props) => {
  const { room, openRoom, deleteRoom } = props;
  const roomId = room._id;
  let firstRoomimagePath, imgSourcePath, imgPath;
  if (room.images[0]) {
    firstRoomimagePath = room.images[0].path;
    imgSourcePath = firstRoomimagePath.split("/");
    imgPath = "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
  } else {
    imgPath = "/assets/images/roomStock1.jpeg";
  }
 
  return (
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
          <Button basic color='green' onClick={() => openRoom(roomId)}>
            Open
          </Button>
          <Button basic color='red' onClick={() => deleteRoom(roomId)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default RoomHolder