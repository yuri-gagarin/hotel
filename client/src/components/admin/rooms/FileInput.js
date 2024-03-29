// @flow
import * as React from "react";
import { Button } from "semantic-ui-react";
//
import ImgUploadControls from "../shared/ImgUploadControls";
//
import type { ServiceState } from "../../../redux/reducers/service/flowTypes";
import type { DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RoomState } from "../../../redux/reducers/rooms/flowTypes";
import type { NewsPostsState } from "../../../redux/reducers/news_posts/flowTypes";

// css an styles //
import styles from "./css/fileInput.module.css";

type UnionState = (DiningEntertainmentState | ServiceState | RoomState | NewsPostsState );

type Props = {
  uploadImage: <S>(data: FormData, currentState: S) => Promise<boolean>,
  dataName: "roomImage" | "serviceImage" | "diningImage" | "menuImage" | "newsPostImage",
  modelState: UnionState,
  textContent?: string
}
type LocalState = {
  file: File | null,
  objectURL: string
}
const FileInput = ({ uploadImage, dataName, modelState, textContent }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ file: null, objectURL: "" });

  
  const onChange = (e) => {
    if (e.target && e.target.files) {
      setLocalState({ ...localState, file: e.target.files[0], objectURL: URL.createObjectURL(e.target.files[0]) });
    }
  };
  

  const uploadFile = () => {
    let data = new FormData();
    if (localState.file) {
      data.append(dataName, localState.file);
      return uploadImage(data, modelState)
        .then((success) => {
          if (success) {
            const input = document.getElementById(`${dataName}FileInput`);
            if (input instanceof HTMLInputElement) {
              input.value = "";
            }
            // clear the input //
            setLocalState({ ...localState, file: null, objectURL: "" });
          }
        });
      }
  };

  const cancelFile = () => {
    const input = document.getElementById(`${dataName}FileInput`);
    if (input instanceof HTMLInputElement) {
      input.value = "";
    }
    setLocalState({ ...localState, file: null, objectURL: "" });
  }

  return (
    <div className={ styles.fileInputContainer }>
      <input type="file" id={`${dataName}FileInput`} hidden onChange={onChange} />   
      {
        localState.file 
        ?
        <div className={ styles.uploadControlsContainer }>
          <ImgUploadControls handleUpload={ uploadFile } handleCancel = { cancelFile } />
          <div className={ styles.fileName}>{ localState.file.name }</div>
          {
            localState.objectURL ? <img className={ styles.uplPreviewThumb } src={ localState.objectURL }></img> : null
          }
        </div>
        :
        <div className={ styles.uploadControlsContainer}>
          <div className={ styles.textContent }>{ textContent ? textContent : "Upload Images"}</div>
          <Button 
            as="label" 
            htmlFor={`${dataName}FileInput`}
            icon="file" 
            type="button">
          </Button>
          <span style={{marginLeft: "1em"}}>{( localState.file && localState.file.name ) ? localState.file.name : "No file"}</span>
        </div>
      }
        
    </div>
  );
};

export default FileInput;