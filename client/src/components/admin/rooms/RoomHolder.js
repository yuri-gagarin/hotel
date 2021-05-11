// @flow
import * as React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { CardOnlineStatusBlinkers } from "../shared/CardOnlineStatusBlinkers";
// styles and css //
import styles from "./css/roomHolder.module.css";
// helpers //
import { trimStringToSpecificLength, setStringTranslation, setImagePath } from "../../helpers/displayHelpers";
// types //
import type { RoomData } from "../../../redux/reducers/rooms/flowTypes";

type Props = {
  room: RoomData;
  openRoom: (roomId: string) => void;
  deleteRoom: (roomId: string) => void;
};

const RoomHolder = ({ room, openRoom, deleteRoom }: Props): React.Node => {
  const { _id : roomId, live, images } = room;
 
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
          src={ images.length > 0 ? setImagePath(images[0].path) : setImagePath() }
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
      <Card.Content style={{ height: "10%", display: "flex", alignItems: "center" }}>
        <CardOnlineStatusBlinkers live={ live } />
      </Card.Content>
    </Card>
  );
};

export default RoomHolder