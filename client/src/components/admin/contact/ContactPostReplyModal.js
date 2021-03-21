// @flow
import * as React from "react";
// semantic ui react //
import { Button, Container, Modal } from "semantic-ui-react";
// ck editor //
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type Props = {
  replyModalOpen: boolean,
  handleCloseModal: () => void,
  sendContactReply: () => void // this will be vastly different
};
type LocalState = {
  editorState: string
};

export const ContactPostReplyModal = ({ replyModalOpen, handleCloseModal, sendContactReply } : Props): React.Node => {
  const { useState } = React;
  const [ localState, setLocalState ] = useState<LocalState>({ editorState: "" });

  const setInitialMessage = () => {
    return (
      `<p>your response ... </p>`
    );
  };
  const handleInit = (e, editor) => {
   
  };
  const handleEditorChange = (e, editor) =>{
    setLocalState({ ...localState, editorData: editor.getData() });
  };
  return (
    <Modal open={ replyModalOpen }>
      <Container fluid>
        <h4>Write your reply</h4>
        <CKEditor
          editor={ ClassicEditor }
          data={ setInitialMessage() }
          onInit={ handleInit }
          onChange={ handleEditorChange }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
        />
      </Container>
      <Container>
        <Button onClick={ sendContactReply }>Send Reply</Button>
        <Button onClick={ handleCloseModal }>Close Screen</Button>
      </Container>    
    </Modal>      
  );
};
