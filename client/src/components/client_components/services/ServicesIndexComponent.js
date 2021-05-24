// @flow
import * as React from "react";
// additonal components //
import { AnimatedBorder } from "../shared/AnimatedBorder";
import { AnimatedBorderButton } from "../shared/AnimatedBorderButton";
import ClipText from "../../admin/shared/ClipText";
import ServiceClientView from "./ServiceClientView";
import GenericImgModalCarousel from "../shared/GenericImgModalCarousel";
// react bootstrap component imports //
import { Container, Row, Col } from "react-bootstrap";
import styles from "./css/servicesIndexContainer.module.css";
// redux //
import { connect } from "react-redux";
import { handleFetchServices } from "../../../redux/actions/serviceActions";
// types //
import type { ServiceState, ServiceAction } from "../../../redux/reducers/service/flowTypes";
import type { Dispatch, RootState } from "../../../redux/reducers/_helpers/createReducer";
// helpers //

type Props = {
  serviceState: ServiceState,
  _handleFetchServices: () => Promise<boolean>
};
type PicureModalState = {
  modalOpen: boolean,
  imgURLS: Array<string>,
  imageIndex: number
};

const ServicesIndexComponent = ({ _handleFetchServices, serviceState }): React.Node => {
  const [ headerFixed, setHeaderFixed ] = React.useState(false);
  const [ picureModalState, setPictureModalState ] = React.useState<PicureModalState>({ modalOpen: false, imgURLS: [], imageIndex: 0 })
  const indexRowRef = React.useRef<HTMLElement | null>(null);


  React.useEffect(() => {
    _handleFetchServices();
  }, []);

  const triggerImgModal = (imgURLS: Array<string>, index: number) => {
    setPictureModalState({ modalOpen: true, imgURLS: imgURLS, imageIndex: index });
  };
  const closeModal = () => {
    setPictureModalState({ modalOpen: false, imgURLS: [], imageIndex: 0 });
  };

  const handleScrollToContent = () => {

  };

  return (
    <div className={ styles.mainContainer }>
      <div className={ styles.parallaxContainer }>
        <div className={ styles.headerRow }>
          <div className={ styles.animatedHeaderBorderTop }></div>
          <div className={ `${styles.headerText} ${ headerFixed ? styles.fixed : ""}`} ref={ indexRowRef }>
            <ClipText text={"Services"} className={ `${styles.svgElem} ${ headerFixed ? styles.animateSVGElem : ""}` } />
          </div>
          <div className={ styles.animatedHeaderBorderTop }></div>
        </div>
        <div className={ styles.exploreBtnWrapper }>
          <AnimatedBorderButton onClick={ handleScrollToContent } />
        </div>
      </div>
     
      <GenericImgModalCarousel  
        show={ picureModalState.modalOpen } 
        imgURLS={ picureModalState.imgURLS } 
        imageIndex={ picureModalState.imageIndex } 
        closePictureModal={ closeModal } 
      />

      { serviceState.createdServices.map(( service ) => {
          return (
            <ServiceClientView 
              key={ service._id } 
              service={ service } 
              triggerImgModal={ triggerImgModal } 
            />
          )
        }) 
      }
      
      <div className={ styles.servicesBreakpoint }>
      </div>
    </div>
  )
};  

// redux mapping functions //
const mapStateToProps = (state: RootState) => {
  return {
    serviceState: state.serviceState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<ServiceAction>) => {
  return {
    _handleFetchServices: () => handleFetchServices(dispatch)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ServicesIndexComponent): React.AbstractComponent<Props>);