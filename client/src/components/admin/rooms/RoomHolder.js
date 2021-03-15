import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
// styles and css //
import styles from "./css/roomHolder.module.css";
// helpers //
import { trimStringToSpecificLength } from "../../helpers/displayHelpers";

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
    <Card >
      <Card.Content textAlign={"center"}>
        <Card.Header style={{ marginBottom: "0.5em" }}>
          <div className={ styles.headerTitle }>Room Type:</div>
          <div className={ styles.headerRoomType }>{room.roomType}</div>
        </Card.Header>
        <Image
          size='small'
          rounded
          src={imgPath}
        />
        <Card.Description>
          <p>Room Description:</p>
          {trimStringToSpecificLength(room.description)}
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