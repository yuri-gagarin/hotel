// @flow
import * as React from "react";
import { Button, Popup } from "semantic-ui-react";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";
// 
import styles from "./css/modelDeleteBtn.module.css";

type Props = {
  modelName: "room" | "service" | "dining",
  modelId: string,
  handleModelDelete: (modelId: string) => void,
  className?: string
}

const ModelDeleteBtn = ({ modelName, modelId, handleModelDelete, className } : Props): React.Element<"div"> => {
  const confirmContent = `This will delete the current ${capitalizeString(modelName)} and all if its data. All corresponding images will also be deleted. This action is irreversible.`;
  
  const triggerDelete = () => {
    handleModelDelete(modelId);
  };

  return (
    <div className={ styles.modelDeleteBtnDiv }>
      <Popup 
        content={ `Delete the current <${capitalizeString(modelName)}>` }
        trigger={ 
          <Button 
            color="red"
            onClick={ triggerDelete }
            content="Delete"
          />
        }
      />
    </div>  
  );
};

export default ModelDeleteBtn;