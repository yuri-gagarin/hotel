// @flow
import * as React from "react";
// additional components //
import { AnimatedBorder } from "../shared/AnimatedBorder";
// FLOW types //
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
import styles from "./css/serviceClientView.module.css";
// helpers //
import { setImagePath, setStringTranslation } from "../../helpers/displayHelpers";

type Props = {
  service: ServiceData,
  triggerImgModal: (imgULRS: Array<string>, imageIndex: number) => void
};

const ServiceClientView = ({ service, triggerImgModal }: Props): React.Node => {
  const { serviceType, price, hours, description } = service;
  const [ imgURLS, setImgURLS ] = React.useState<Array<string>>([]);
  
  React.useEffect(() => {
    const urls: Array<string> = [];
    for (let i = 0; i < 3; i++) {
      if (service.images[i]) {
        urls.push(setImagePath(service.images[i].path));
      } else {
        urls.push(setImagePath());
      }
    }
    setImgURLS(urls);
  }, [ service ]);

  const handleServiceInfoClick = () => {
    console.log("clicked")
  }

  return (
    <React.Fragment>
      <AnimatedBorder animationDelay={ 500 } />
        <div className={ styles.serviceViewContainer }>
          <div className={ styles.serviceTitlediv }>
            <div className={ styles.serviceTitle }>  
              { serviceType ? serviceType : "Service type here..." }
            </div>
          </div>
          <div className={ styles.servicesPicRow }>
            <div className={ styles.servicesPicDiv }>
              <div className={ styles.serviceImgDiv } onClick={() => triggerImgModal(imgURLS, 0)}>
                <img className={ styles.serviceImg } src={ imgURLS[0] } />
              </div>
            </div>
            <div className={ styles.servicesPicDiv } >
              <div className={ styles.serviceImgDiv } onClick={() => triggerImgModal(imgURLS, 1)}>
                <img className={ styles.serviceImg } src={ imgURLS[1] } />
              </div>
            </div>
            <div className={ styles.servicesPicDiv } >
              <div className={ styles.serviceImgDiv } onClick={() => triggerImgModal(imgURLS, 2)}>
                <img className={ styles.serviceImg } src={ imgURLS[2] } />
              </div>
            </div>
          </div>
          <div className={ `${styles.serviceInfoRow}` }>
            <div className={ `${styles.serviceInfoDiv}` }>
              <div className={ styles.hoursDiv }>
                <span>Hours:</span>
                <i className="far fa-clock"></i>
                <span>{ hours ? hours : "No hours provided..." }</span>
                {
                  price ? <div className={ styles.priceDiv }>{ price }</div>  : null
                }
              </div>
            </div>
            <div className={ styles.serviceDescDiv }>
              <div className={ styles.descContent }>
                <p>{ description ? setStringTranslation(description, "en") : "No description..."}</p>
              </div>
            </div>
          </div>
        </div>
      <AnimatedBorder animationDelay={ 500 } />
    </React.Fragment>
  )
};

export default ServiceClientView;