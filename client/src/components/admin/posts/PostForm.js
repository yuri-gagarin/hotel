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
  
  const titleInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleEditorChange = (_, editor: any): void => {
    handleUpdateEditor(editor);
  };

  React.useEffect(() => {
    if (titleInputRef.current) titleInputRef.current.focus();
  }, [ titleInputRef.current ]);

  return (
    <div className={ styles.newPostFormWrapper }>
      <div className={ styles.titleInputDiv}>
        <label>Title:</label>
        <input onChange={ handleTitleChange } value={ titleText ? titleText : "" } placeholder={ "Title of news post here" } ref={ titleInputRef }></input>
      </div>
      <div className={ styles.editorContainer}>
        <CKEditor className={ styles.editor }
          editor={ ClassicEditor }
          onChange={ handleEditorChange }
          data={ editorText }
        />  
      </div>
    </div>
  );
};