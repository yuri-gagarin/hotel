// @flow
import * as React from "react";
import { Form } from "semantic-ui-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//
import styles from "./css/postForm.module.css";

type PostFormProps = {
  titleText: string;
  editorText: string;
  handleUpdateEditor: (editor: any) => void;
  handleTitleChange: (e: any) => void;
}
export const PostForm = ({ titleText, editorText, handleTitleChange, handleUpdateEditor }: PostFormProps): React.Node => {
  
  const handleEditorChange = (_, editor: any): void => {
    handleUpdateEditor(editor);
  };

  return (
    <div className={ styles.newPostFormWrapper }>
      <div className={ styles.titleInputDiv}>
        <label>Title:</label>
        <input onChange={ handleTitleChange } value={ titleText ? titleText : "" }></input>
      </div>
      <div className={ styles.editorContainer}>
        <CKEditor
          editor={ ClassicEditor }
          onChange={ handleEditorChange }
          data={ editorText }
        />  
      </div>
    </div>
  );
};