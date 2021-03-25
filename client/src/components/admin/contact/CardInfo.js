// @flow
import * as React from "react";
import styles from "./css/cardInfo.module.css";

type Props = {
  read: boolean,
  replied: boolean
}
export const CardInfo = ({ read, replied } : Props): React.Node => {

  return (
    <div className={ styles.cardInfoWrapper }>
      <span>Read:</span>
      <div className={ `${styles.iconDiv} ${ read ? styles.positive : styles.negative }` }>
        {
          read ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>     
        }
      </div>
      <span>Replied:</span>
      <div className={ `${styles.iconDiv} ${ replied ? styles.positive : styles.negative }`}>
        {
          replied ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>    
        } 
       </div>
    </div>
  )
} 