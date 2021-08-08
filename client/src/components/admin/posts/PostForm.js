// @flow
import * as React from "react";
import { Form } from "semantic-ui-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//
import styles from "./css/postForm.module.css";

type PostFormProps = {
  editorText: string;
  handleUpdateEditor: (editor: any) => void;
}
export const PostForm = ({ editorText, handleUpdateEditor }: PostFormProps): React.Node => {
  const handleEditorChange = (_, editor: any): void => {
    handleUpdateEditor(editor);
  };
  const setInitialData = (): void => {

  }
  return (
    <div className={ styles.newPostFormWrapper }>
      <div className={ styles.previewTextHTML }>
        {
          editorText 
          ? <div dangerouslySetInnerHTML={{ __html: editorText }}></div>
          : <p>You post preview will show up here</p>
        }
      </div>
      <div className={ styles.editorContainer}>
        <CKEditor
          editor={ ClassicEditor }
          onChange={ handleEditorChange }
          data={ setInitialData() }
        />  
      </div>
    </div>
  );
}