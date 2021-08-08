// @flow
import * as React from "react";
// semantic ui react //
import { Button, Container, Icon, Input, Form, Label, Modal, Popup } from "semantic-ui-react";
// additional components //
import { FormErrorMessages } from "../shared/FormErrorMessages";
// ck editor //
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// type //
import type { ContactPostData, AdminContactPostReplyData } from "../../../redux/reducers/contact_posts/flowTypes";
// styles and css //
import styles from "./css/contactPostReplyModal.module.css";
// helpers //
import { usePrevious } from "../../helpers/componentHelpers";
import { validateEmail, checkEmptyString, objectValuesEmpty } from "../../helpers/displayHelpers";
type Props = {
  replyModalOpen: boolean,
  contactPostData: ContactPostData,
  handleCloseModal: () => void,
  sendContactReply: (data: AdminContactPostReplyData) => Promise<boolean>
};
type LocalState = {
  recipientEmail: string,
  senderEmail: string,
  emailSubject: string,
  emailBodyHTML: string, // a string with HTML tags ! //
};
type ErrorState = {
  recipientEmailError: null | string,
  senderEmailError: null | string,
  emailSubjectError: null | string
};
type ErrorComponentState = {
  visible: boolean,
  errorMessages: Array<string>
};

const initialString = `<p>Initial Email</p><p>Thank you for your interest. This is our response. We really Appreciate your email</p><p>Administrator</p>`;

export const ContactPostReplyModal = ({ replyModalOpen, contactPostData, handleCloseModal, sendContactReply }: Props): React.Node => {
  const { useState, useEffect, useRef } = React;
  // this may be bad practice to reassign prop data to state but //
  // for now we need to have emails editable //
  const [ localState, setLocalState ] = useState<LocalState>({ 
    recipientEmail: contactPostData.email,
    senderEmail: "admin@email.com",
    emailSubject: "Re: your message ...",
    emailBodyHTML: initialString
  });
  const [ errorState, setErrorState ] = useState<ErrorState>({ recipientEmailError: null, senderEmailError: null, emailSubjectError: null });
  const [ errorComponentState, setErrorComponentState ] = useState<ErrorComponentState>({ visible: false, errorMessages: [] });

  const previousLocalState = usePrevious<LocalState>(localState);

  const setInitialData = () => {
    return initialString;
  };
  /* form validators */
  /* more concise later ? */
  useEffect(() => {
    if (previousLocalState && (previousLocalState !== localState)) {
      // validate recipient email if changed //
      if (previousLocalState.recipientEmail !== localState.recipientEmail) {
      // validate recipient email if changed //
        if (!validateEmail(localState.recipientEmail)) {
          setErrorState({ ...errorState, recipientEmailError: "Invalid Recipient Email" });
        } else {
          setErrorState({ ...errorState, recipientEmailError: null });
        }
      } else if (previousLocalState.senderEmail !== localState.senderEmail) {
        if (!validateEmail(localState.senderEmail)) {
          setErrorState({ ...errorState, senderEmailError: "Invalid Sender Email" });
        } else {
          setErrorState({ ...errorState, senderEmailError: null });
        }
      } else if (previousLocalState.emailSubject !== localState.emailSubject) {
        if (checkEmptyString(localState.emailSubject)) {
          setErrorState({ ...errorState, emailSubjectError:"Email Subject is empty" });
        } else {
          setErrorState({ ...errorState, emailSubjectError: null });
        }
      } else {
        return () => {}
      }
      // validate sender email if changed //
      // validate email subject if changed //
    }
  }, [ localState ]);
  
  const handleErrorMessageDismiss = () => {
    setErrorComponentState({ ...errorComponentState, visible: false, errorMessages: [] });
  }
  /* reply send */
  const handleReplySend = () => {
    if (objectValuesEmpty(errorState)) {
      // no input errors process response //
      const { _id: postId } =contactPostData;
      const contactPostReplyData: AdminContactPostReplyData = { 
        postId: postId,
        recipientEmail: localState.recipientEmail,
        senderEmail: localState.senderEmail,
        originalContent: contactPostData.content,
        emailSubject: localState.emailSubject,
        replyContent: localState.emailBodyHTML
      }
      sendContactReply(contactPostReplyData)
        .then((success) => {
          if (success) handleCloseModal();
        });
    } else {
      const errorMessages: Array<string> = Object.keys(errorState)
        .map((key) => {
          if (errorState[key]) return errorState[key];
          else return ""
        })
        .filter((val) => val !== "");
      
      setErrorComponentState({ ...errorComponentState, visible: true, errorMessages: errorMessages })
    }
  };
  /* input fields listeners */
  const handleRecipientEmailChange = (_, data: any) => {
    setLocalState({ ...localState, recipientEmail: data.value });
  };
  const handleSenderEmailChange = (_, data: { value: string }) => {
    setLocalState({ ...localState, senderEmail: data.value });
  };
  const handleEmailSubjectChange = (_, data: { value: string }) => {
    setLocalState({ ...localState, emailSubject: data.value })
  }
  const handleEditorChange = (_, editor: any) =>{
    setLocalState({ ...localState, emailBodyHTML: editor.getData() });
  };
  return (
    <Modal className={ styles.contactPostReplyModal } open={ replyModalOpen }> 
      <div className={ styles.replyControlsDiv }>
        <Button.Group>
          <Popup 
            position="bottom center"
            content="Reply and close window"
            trigger={
              <Button positive icon="reply" content="Send Reply" onClick={ handleReplySend } />
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
          <Form.Field error={ errorState.recipientEmailError ? { content: errorState.senderEmailError, pointing: "below" } : null }>
            <Input  
              fluid
              label={
                <Label className={ styles.replyInputLabel }>
                  <Icon name="envelope" />To:
                </Label>
              }
              value={ localState.recipientEmail}
              onChange={ handleRecipientEmailChange }
            />
          </Form.Field>
          <Form.Field error={ errorState.senderEmailError ? { content: errorState.senderEmailError, pointing: "below" } : null }>
            <Input
              fluid
              error={ errorState.senderEmailError }
              label={
                <Label className={ styles.replyInputLabel }>
                  <Icon name="envelope" />From:
                </Label>
              }
              value={ localState.senderEmail }
              onChange={ handleSenderEmailChange }
            />

          </Form.Field>
          <Form.Field error={ errorState.emailSubjectError ? { content: errorState.emailSubjectError, pointing: "below" } : null }>
            <Input
              fluid
              error={ errorState.emailSubjectError }
              label={
                <Label className={ styles.replyInputLabel }>
                  <Icon name="list alternate" />Subject:
                </Label>
              }
              value={ localState.emailSubject }
              onChange={ handleEmailSubjectChange }
            />

          </Form.Field>
          <Form.Field>
            <FormErrorMessages visible={ errorComponentState.visible } errorMessages={ errorComponentState.errorMessages } handleErrorMessageDismiss={ handleErrorMessageDismiss } />
          </Form.Field>
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
          data={ setInitialData() }
        />        
      </div>
    </Modal>      
  );
};
