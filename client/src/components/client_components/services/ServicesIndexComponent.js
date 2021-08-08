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
type HeaderRowState = {
  headerFixed: boolean;
  headerTop: string;
}

const ServicesIndexComponent = ({ _handleFetchServices, serviceState }): React.Node => {
  const headerRowRef = React.useRef<HTMLElement | null>(null);
  const [ picureModalState, setPictureModalState ] = React.useState<PicureModalState>({ modalOpen: false, imgURLS: [], imageIndex: 0 })
  const [ headerRowState, setHeaderRowState ] = React.useState<HeaderRowState>({ headerFixed: false, headerTop: "" });


  React.useEffect(() => {
    _handleFetchServices();
  }, []);

  const triggerImgModal = (imgURLS: Array<string>, index: number) => {
    setPictureModalState({ modalOpen: true, imgURLS: imgURLS, imageIndex: index });
  };
  const closeModal = () => {
    setPictureModalState({ modalOpen: false, imgURLS: [], imageIndex: 0 });
  };
  const scrollToContent = () => {
    const intViewportHeight = window.innerHeight;
    window.scrollTo({ top: intViewportHeight - 180, behavior: "smooth" });
  }

  React.useEffect(() => {
    if (headerRowRef.current) {
      window.onscroll = () => {
        const headerRowRefY: number = headerRowRef.current ? headerRowRef.current.getBoundingClientRect().top : 0;
        if (headerRowRefY <= 50) {
          if (!headerRowState.headerFixed) {
            setHeaderRowState({ headerFixed: true, headerTop: "50px" });
          }
        }
      }
    }
    return () => {
      window.onscroll = null;
    }
  }, [ headerRowRef.current ]);

  return (
    <div className={ styles.mainContainer }>
      <div className={ styles.parallaxContainer }>
        <div className={ `${styles.headerRow} ${headerRowState.headerFixed ? styles.headerFixed : ""}`} ref={ headerRowRef }>
          <div className={ styles.animatedHeaderBorderTop }></div>
          <div className={ `${styles.svgContainer} ${headerRowState.headerFixed ? styles.svgContainerFixed : "" }` }>
            <ClipText text="Services" textId="services" fontSize={"1.75em"} className={ `${styles.svgElem} ${ headerRowState.headerFixed ? styles.animateSVGElem : ""}` } />
          </div>
          <div className={ styles.animatedHeaderBorderTop }></div>
        </div>
        <div className={ styles.exploreBtnWrapper }>
          <AnimatedBorderButton onClick={ scrollToContent } />
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