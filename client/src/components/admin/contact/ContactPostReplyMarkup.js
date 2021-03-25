// @flow
import * as React from "react";
import styles from "./css/contactPostReplyMarkup.module.css";

type Props = {
  rawHTMLString: string
}
export const ContactPostReplyMarkup = ({ rawHTMLString } : Props): React.Node => {

  return (
    <div className={ styles.contactPostReplyMarkupWrapper }>
      <div className={ styles.replyHeader}>You replied:</div>
      <div dangerouslySetInnerHTML={{ __html: rawHTMLString }}></div>
    </div>
  )
}