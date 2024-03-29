// @flow 
import * as React from "react";
// bootstrap react //
import { Row, Col } from "react-bootstrap";
// additional components //
import ClipText from "../../admin/shared/ClipText";
import { CafeComponent } from "./cafe/CafeComponent";
import { LoungeComponent } from "./lounge/LoungeComponent";
import { RestaurantComponent } from "./restaurant/RestaurantComponent";
// redux //
import { connect } from "react-redux";
import { handleFetchDiningModels } from "../../../redux/actions/diningActions";
// styles and css //
import styles from "./css/diningIndex.module.css";
// types //
import type { RootState } from "../../../redux/reducers/_helpers/createReducer";
import type { DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RouterHistory } from "react-router-dom";
// helpers //

type WrapperProps = {|
  history: RouterHistory;
|};
type Props = {|
  ...WrapperProps,
  diningEntertainmentState: DiningEntertainmentState,
  _handleFetchDiningEntModels: (options: any) => Promise<boolean>
|};
type LocalState = {
  headerFixed: boolean,
  headerTop: string
}
const DiningIndexContainer = ({ history, diningEntertainmentState, _handleFetchDiningEntModels }: Props) => {
  const headerRowRef = React.useRef<HTMLElement | null>(null);
  const [ headerRowState, setHeaderRowState ] = React.useState<LocalState>({ headerFixed: false, headerTop: "" });

  React.useEffect(() => {
    window.scrollTo({ x: 0, y: 0 });
    _handleFetchDiningEntModels({ live: true });
  }, []);

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

  const scrollToContent = () => {
    const intViewportHeight = window.innerHeight;
    window.scrollTo({ top: intViewportHeight - 180, behavior: "smooth" });
  }

  return (
    <div className={ styles.diningIndexContainer }>
      <div className={ `${styles.parallaxGroup} ${styles.parallaxContainer}` }>
        <div className={ `${styles.headerRow} ${headerRowState.headerFixed ? styles.headerFixed : ""}` } style={ headerRowState.headerFixed ? { top: headerRowState.headerTop } : {}} ref={ headerRowRef }>
          <div className={ `${styles.svgContainer} ${headerRowState.headerFixed ? styles.svgContainerFixed : "" }` }>
            <ClipText className={ styles.firstSvg } text="Dining" textId="dining" fontSize={"1.75em"} />
            <ClipText className={ styles.secondSvg } text="and" textId="and" fontSize={"1.25em"}/>
            <ClipText className={ styles.thirdSvg } text="Entertainment" textId="entainmnt" fontSize={"1.75em"} letterSpacing={"5px"} />
          </div>
        </div>
        <div className={ styles.exploreBtnWrapper }>
          <button className={ styles.exploreBtn } onClick={ scrollToContent }>
            Explore
            <div className={ styles.buttonHorizontal }></div>
            <div className={ styles.buttonVertical }></div>
          </button>
        </div>
      </div>
      <RestaurantComponent diningOption= { diningEntertainmentState.diningEntModelData } />
      <div className={ styles.plainSpacer }></div>
      <CafeComponent diningOption={ diningEntertainmentState.diningEntModelData } />
      <div className={ styles.plainSpacer }></div>
      <LoungeComponent diningOption={ diningEntertainmentState.diningEntModelData } />
      <div className={ styles.plainSpacer }></div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    diningEntertainmentState: state.diningEntertainmentState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _handleFetchDiningEntModels: (options: any) => handleFetchDiningModels(dispatch, options)
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(DiningIndexContainer): React.AbstractComponent<WrapperProps>);

