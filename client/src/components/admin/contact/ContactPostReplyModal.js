// @flow
import * as React from "react";
// semantic ui react //
import { Button, Container, Icon, Input, Form, Label, Modal, Popup } from "semantic-ui-react";
// ck editor //
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// type //
import type { ContactPostData } from "../../../redux/reducers/contact_posts/flowTypes";
// styles and css //
import styles from "./css/contactPostReplyModal.module.css";

type Props = {
  replyModalOpen: boolean,
  contactPostData: ContactPostData,
  handleCloseModal: () => void,
  sendContactReply: () => void // this will be vastly different
};
type LocalState = {
  editorState: string
};

export const ContactPostReplyModal = ({ replyModalOpen, contactPostData, handleCloseModal, sendContactReply } : Props): React.Node => {
  const { useState } = React;
  const [ localState, setLocalState ] = useState<LocalState>({ editorState: "" });
  

  const setInitialMessage = () => {
    return (
      `
      <div style={{ fontStyle: "italic" }}>
        <p>Message is here</p>
      </div>
      `
    );
  };
  const handleInit = (e, editor) => {
   
  };
  const handleEditorChange = (e, editor) =>{
    setLocalState({ ...localState, editorData: editor.getData() });
  };
  return (
    <Modal className={ styles.contactPostReplyModal } open={ replyModalOpen }> 
      <div className={ styles.replyControlsDiv }>
        <Button.Group>
          <Popup 
            position="bottom center"
            content="Reply and close window"
            trigger={
              <Button positive icon="reply" content="Send Reply" onClick={ sendContactReply } />
            }
          />
          <Popup 
            position="bottom center"
            className={ styles.cancelPopup }
            content="Close and cancel. Changes will not be saved."
            trigger={
              <Button color="orange" icon="cancel" content="Cancel" onClick={ handleCloseModal } />
            }
          />
        </Button.Group>
      </div>
      <div className={ styles.replyFormDataDiv }>
        <Form>
          <Input 
            fluid
            label={
              <Label className={ styles.replyInputLabel }>
                <Icon name="envelope" />To:
              </Label>
            }
            value={ contactPostData.email }
          />
          <Input
            fluid
            label={
              <Label className={ styles.replyInputLabel }>
                <Icon name="envelope" />From:
              </Label>
            }
            value={ "admin@email.com" }
          />
          <Input
            fluid
            label={
              <Label className={ styles.replyInputLabel }>
                <Icon name="list alternate" />Subject:
              </Label>
            }
            value={ "Re: your email..." }
          />
        </Form>
      </div>
      <div className={ styles.contactPostDataContainer }>
        <div className={ styles.contactPostUserMessage }>
          <div className={ styles.contactPostUserMessageHeader }>
            <span>{ contactPostData.email }</span><span>wrote:</span>
          </div>
          <div className={ styles.contactPostUserMessageContent }>
            { `"${contactPostData.content }"`}
          </div>
        </div>
      </div>
      <div className={ styles.contactPostAdminResponse}>
        <CKEditor
            editor={ ClassicEditor }
            onChange={ handleEditorChange }
            config={{ height: 100 }}
          />        
      </div>
    </Modal>      
  );
};
