// @flow
import * as React from "react";
import { Form } from "semantic-ui-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImgUploadControls from "../shared/ImgUploadControls";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
import FileInput from "../shared/FileInput";
import type { NewsPostsState } from "../../../redux/reducers/news_posts/flowTypes";
//
import styles from "./css/postForm.module.css";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";

type PostFormProps = {
  titleText: string;
  editorText: string;
  handleUpdateEditor: (editor: any) => void;
  handleTitleChange: (e: any) => void;
  newsPostsState: NewsPostsState;
  _handleUploadNewsPostImage: <NewsPostsState>(imageFile: FormData, currentRoomState: NewsPostsState) => Promise<boolean>,
}
export const PostForm = ({ titleText, editorText, handleTitleChange, handleUpdateEditor, newsPostsState, _handleUploadNewsPostImage }: PostFormProps): React.Node => {
  
  const titleInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleEditorChange = (_, editor: any): void => {
    handleUpdateEditor(editor);
  };

  const handleToggleImageModal = (imgId: string): void => {

  }

  React.useEffect(() => {
    if (titleInputRef.current) titleInputRef.current.focus();
  }, [ titleInputRef.current ]);

  return (
    <div className={ styles.newPostFormWrapper }>
      <div className={ styles.titleInputDiv}>
        <label>Title:</label>
        <input onChange={ handleTitleChange } value={ titleText ? titleText : "" } placeholder={ "Title of news post here" } ref={ titleInputRef }></input>
      </div>
      <div className={ styles.newsPostFormInner }>
        <div className={ styles.editorContainer}>
          <CKEditor className={ styles.editor }
            editor={ ClassicEditor }
            onChange={ handleEditorChange }
            data={ editorText }
          />  
        </div>
        <div className={ styles.imageUploader }>
          <div className= { styles.fileInputDiv }>
            <FileInput dataName="newsPostImage" modelState={ newsPostsState } uploadImage={ _handleUploadNewsPostImage } />
          </div>
          {
            newsPostsState.newsPostImages.length > 0
            ?
            <PreviewImagesCarousel images={ newsPostsState.newsPostImages } showDeleteIcons={ true } toggleImageModal={ handleToggleImageModal } />
            :
            <GeneralNoModelsSegment customHeaderMessage={'No post images'} customContentMessage={"Upload news post images here"}  />
          }
        </div>

      </div>
      
    </div>
  );
};