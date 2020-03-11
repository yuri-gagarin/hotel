import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const ServiceHolder = (props) => {
  const { service, openService, deleteService } = props;
  const serviceId = service._id;
  let firstServiceImagePath, imgSourcePath, imgPath;
  if (service.images[0]) {
    firstServiceImagePath = service.images[0].path;
    imgSourcePath = firstServiceImagePath.split("/");
    imgPath = "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
  } else {
    imgPath = "/assets/images/roomStock1.jpeg";
  }
 
  return (
    <Card >
      <Card.Content>
        <Card.Header>{service.serviceType}</Card.Header>
        <Image
          size='small'
          src={imgPath}
        />
        <Card.Description>
          {service.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => openService(serviceId)}>
            Open
          </Button>
          <Button basic color='red' onClick={() => deleteService(serviceId)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ServiceHolder;