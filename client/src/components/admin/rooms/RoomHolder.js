import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
// styles and css //
import styles from "./css/roomHolder.module.css";
// helpers //
import { trimStringToSpecificLength, setStringTranslation } from "../../helpers/displayHelpers";

const RoomHolder = (props) => {
  const { room, openRoom, deleteRoom } = props;
  const { _id : roomId, live } = room;
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
      <Card.Content textAlign={"center"} style={{ height: "90%"}}>
        <Card.Header style={{ marginBottom: "0.5em" }}>
          <div className={ styles.headerTitle }>Room Type:</div>
          <div className={ styles.headerRoomType }>{setStringTranslation(room.roomType, "en")}</div>
        </Card.Header>
        <Image
          size='small'
          rounded
          src={imgPath}
        />
        <Card.Description>
          <p>Room Description:</p>
          {trimStringToSpecificLength(setStringTranslation(room.description, "en"))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ height: "10%", display: "flex", alignItems: "center" }}>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => openRoom(roomId)}>
            Open
          </Button>
          <Button basic color='red' onClick={() => deleteRoom(roomId)}>
            Delete
          </Button>
        </div>
      </Card.Content>
      <Card.Content style={{ height: "10%"}}>
        <div className={ styles.roomCardOnlineStatus} >
          <div className={ `${styles.roomCardOnlineBlinker} ${ live ? styles.roomOnline : styles.roomOffline }` }>
          </div>
          <span className={ styles.roomCardOnlineStatusText }>
            { live ? "Room is online and visible to clients" : "Room is offline" }
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};

export default RoomHolder