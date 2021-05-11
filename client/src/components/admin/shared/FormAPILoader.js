// @flow
import * as React from "react";
import { Loader } from "semantic-ui-react";
// styles and css //
import styles from "./css/formAPILoader.module.css";

type Props = {
  customText?: string;
};
export const FormAPILoader = ({ customText }: Props): React.Node => {

  return (
    <div className={ styles.loaderWrapper }>
      <Loader>{ customText ? customText : "Loading" }</Loader>
    </div>
  );
};
