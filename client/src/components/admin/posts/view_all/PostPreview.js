// @flow
import * as React from "react";
// styles //
import styles from "./css/postPreview.module.css";


export const PostPreview = (): React.Node => {


  React.useEffect(() => {
    console.log("loaded");
  }, []);

  return (
    <div style={{ height: "100px", width: "100px", backgroundColor: "red" }}>
      Post Preview
    </div>
  );
};