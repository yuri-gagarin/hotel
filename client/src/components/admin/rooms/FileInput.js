import React, { useState } from "react";
import { Button } from "semantic-ui-react";
//
import ImgUploadControls from "../shared/ImgUploadControls";
// css an styles //
import styles from "./css/fileInput.module.css";

const FileInput = (props) => {
  const { uploadImage, dataName } = props;
  const [ file, setFile ] = useState(null);
  const [ objectURL, setObjectURL] = useState(null);

  const onChange = (e) => {
    if (e.target && e.target.files) {
      setFile(e.target.files[0]);
      setObjectURL(URL.createObjectURL(e.target.files[0]));
    }
  };
  

  const uploadFile = () => {
    if (!file) return;
    let data = new FormData();
    data.append(dataName, file);
    return uploadImage(data)
      .then((success) => {
        if (success) {
          // clear the input //
          document.getElementById("fileInput").value = "";
          setFile(null);
          setObjectURL(null);
        }
      });
  };

  const cancelFile = () => {
    setFile(null);
  }

  return (
    <div className={ styles.fileInputContainer }>
      <input type="file" id="fileInput" hidden onChange={onChange} />   
      {
        file 
        ?
        <div className={ styles.uploadControlsContainer }>
          <ImgUploadControls handleUpload={ uploadFile } handleCancel = { cancelFile } />
          <div className={ styles.fileName}>{file.name}</div>
          {
            objectURL ? <img className={ styles.uplPreviewThumb } src={ objectURL }></img> : null
          }
        </div>
        :
        <div className={ styles.uploadControlsContainer}>
          <div>Upload Images</div>
          <Button 
            as="label" 
            htmlFor="fileInput"
            icon="file" 
            type="button">
          </Button>
          <span style={{marginLeft: "1em"}}>{( file && file.name ) ? file.name : "No file"}</span>
        </div>
      }
        
    </div>
  );
};

export default FileInput;