// @flow
import * as React from "react";
import { Button, Card, Form, Icon, Modal } from "semantic-ui-react";
// styles and css //
import styles from "./css/defaultMessagesModal.module.css";

type Props = {
  modalOpen: boolean;
  toggleDefaultMessagesModal: () => void;
}
type LocalState = {
  formOpen: boolean;
};
export const DefaultMessagesModal = ({ modalOpen, toggleDefaultMessagesModal }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formOpen: false });

  const setFormOpen = (): void => {
    setLocalState({ ...localState, formOpen: !localState.formOpen });
  }
  return (
    <Modal className={ styles.modal } open={ modalOpen } >
      <Modal.Header className={ styles.modalHeader }>
        Messenger Defaults
        <Button.Group className={ styles.settingsButtons }>
          <Button basic color="green" content="New" onClick={ setFormOpen }/>
          <Button basic color="grey" content="Settings" />
          <Button basic color="red" onClick={ toggleDefaultMessagesModal }>
            <Icon name="close" color="red" />
          </Button>
        </Button.Group>
      </Modal.Header>
      <Modal.Content scrolling>
        {
          localState.formOpen ?
          <Form className={ styles.newDefaultMessageForm }>
            <Form.Group>
              <Form.TextArea className={ styles.defaultMessageTextArea }>

              </Form.TextArea>
            </Form.Group>
            <Form.Group>
              <Button.Group className={ styles.defaultMessageFormControlButtons }>
                <Button basic color="orange" content="Cancel" />
                <Button basic color="green" content="Save" />
              </Button.Group>
            </Form.Group>
          </Form>
          :
          null
        }
        <Card.Group>
          <Card fluid>
            <Card.Content>

            </Card.Content>
            <Card.Content>
              <Button color="blue" content="Edit" />
              <Button color="red" content="Delete" />
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>

            </Card.Content>
            <Card.Content>
              <Button color="blue" content="Edit" />
              <Button color="red" content="Delete" />
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>

            </Card.Content>
            <Card.Content>
              <Button color="blue" content="Edit" />
              <Button color="red" content="Delete" />
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>

            </Card.Content>
            <Card.Content>
              <Button color="blue" content="Edit" />
              <Button color="red" content="Delete" />
            </Card.Content>
          </Card>
        </Card.Group>
      </Modal.Content>
    </Modal>
  );
};