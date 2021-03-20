// @flow
import * as React from 'react';
import { Button, Card, Modal, Image, Icon } from 'semantic-ui-react';
// flow types //
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
// css //
import styles from "./css/serviceHolder.module.css";
// helpers //
import { setImagePath, trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  service: ServiceData,
  openService: (serviceId: string) => void,
  triggerDeleteService: (serviceId: string) => void
}
const ServiceCard = ({ service, openService, triggerDeleteService } : Props): React.Element<"div"> => {
  const { _id: serviceId, live } = service;
  let firstServiceImagePath, imgSourcePath, imgPath;
  const [ localState, setLocalState ] = React.useState<{ imageURL: string, deleteConfirmOpen: boolean }>({ imageURL: "", deleteConfirmOpen: false });

  React.useEffect(() => {
    if (service.images[0]) {
      setLocalState({ ...localState, imageURL: setImagePath(service.images[0].path) });
    } else {
      setLocalState({ ...localState, imageURL: "/assets/images/roomStock1.jpeg" });
    }
   
  }, []);

  return (
    <Card>
      <Card.Content textAlign="center">
        <Card.Header>{service.serviceType}</Card.Header>
        <Image
          rounded
          size="large"
          src={ localState.imageURL }
        />
        <Card.Description textAlign="center">
          {service.description}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => openService(serviceId)} icon="file" content="Open" />           
          <Button basic color='red' onClick={() => triggerDeleteService(serviceId)} icon="trash" content="Delete" />
        </div>
      </Card.Content>
      <Card.Content>
        <div className={ styles.serviceCardOnlineStatus} >
          <div className={ `${styles.serviceCardOnlineBlinker} ${ live ? styles.serviceOnline : styles.serviceOffline }` }>
          </div>
          <span className={ styles.serviceCardOnlineStatusText }>
            { live ? "Service is online and visible to clients" : "Service is offline" }
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ServiceCard;