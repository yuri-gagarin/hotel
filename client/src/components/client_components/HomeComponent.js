// @flow
import * as React from "react";
import $ from "jquery";
import ObjectID from "bson-objectid";
// component imports //
import { HomePageServices } from "./services/home_page/HomePageServices";
import NavbarComponent from "./navbar/NavbarComponent";
import MainHeaderComponent from "./main_header/MainHeaderComponent";
import ContactForm from "./forms/ContactForm";
import Footer from "./footer/Footer";
import MessageFormContainer from "./messaging/MessageFormContainer";
import BookingForm from "./forms/BookingForm";
import SuccessComponent from "../display_components/SuccessComponent";
import ErrorComponent from "../display_components/ErrorComponent";
// redux imports //
import { connect } from "react-redux";
import { clearAppError, clearSuccessState } from "../../redux/actions/appGeneralActions";
import { handleFetchRooms } from "../../redux/actions/roomActions";
// react router //
import { withRouter } from "react-router-dom";
// additional imports //
import { handleSetGuestClient } from "../../redux/actions/clientActions";
import { navbarCollapseListener } from "../helpers/componentHelpers";
import { socket } from "./../../App";
import { setClient } from "./helpers/generalClientComponentHelpers";
// types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch, AppAction } from "../../redux/reducers/_helpers/createReducer";
import type { RoomFetchOptions, RoomState, RoomAction } from "../../redux/reducers/rooms/flowTypes";
import type { ServiceState } from "../../redux/reducers/service/flowTypes";
import type { DiningEntertainmentState } from "../../redux/reducers/dining_entertainment/flowTypes";
import type { ClientData, ClientState, ClientAction } from "../../redux/reducers/client/flowTypes";

type WrapperProps = {
  history: RouterHistory;
};
type Props = {
  ...WrapperProps;
  appGeneralState: any;
  clientState: ClientState;
  roomState: RoomState;
  serviceState: ServiceState;
  diningEntertainmentState: DiningEntertainmentState;
  _clearAppError: () => void;
  _clearSuccessState: () => void;
  _setGuestClient: (data: any) => void;
  _handleFetchRooms: (options?: RoomFetchOptions) => Promise<boolean>;
};

const HomeComponent = ({ history, appGeneralState, clientState, roomState, serviceState, diningEntertainmentState, _clearAppError, _clearSuccessState, _setGuestClient, _handleFetchRooms }: Props): React.Node => {
  const [ successTimeout, setSuccessTimeout ] = React.useState(null);
  const [ errorTimeout, setErrorTimeout ] = React.useState(null);


  const unloadWindowHandler = () => {
    socket.emit("clientLeaving", clientState);
  };

  // set default client info on initial load and load data //
  React.useEffect(() => {
    // automatic form clear for error //
    window.addEventListener("beforeunload", unloadWindowHandler);
    navbarCollapseListener();
    setClient(_setGuestClient)
      .then(() => {
        _handleFetchRooms({ live: true, limit: 1 })
      })
      .then((success) => {
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      window.removeEventListener("beforeunload", unloadWindowHandler);
    }
  }, []); 
  // error and success component triggers //
  React.useEffect(() => {
    const { error, successComponentOpen } = appGeneralState;
    if (error) {
      setErrorTimeout(
        setTimeout(() => {
          _clearAppError();
        }, 5000)
      );
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
     // setErrorTimeout(null);
    }
    if (successComponentOpen) {
      setSuccessTimeout(
        setTimeout(() => {
          _clearSuccessState();
        }, 5000)
      );
    }
    if (!successComponentOpen && successTimeout) {
      clearTimeout(successTimeout);
      //setSuccessTimeout(null);
    }
    return function () {
      if (successTimeout) {
        clearTimeout(successTimeout);

      }
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    }
  }, [ appGeneralState ]);

  React.useEffect(() => {
    if (clientState._id) {
      console.log(117);
      console.log(clientState);
    }
  }, [ clientState ]);
   
  return (
    <div style={{ width: "100vw" }}>
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={_clearSuccessState} />
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={_clearAppError} />
      <NavbarComponent />
      <MainHeaderComponent />
      <BookingForm />
      <HomePageServices history={ history } roomState={ roomState } diningEntertainmentState={ diningEntertainmentState } serviceState={ serviceState } />
      <ContactForm />
      <MessageFormContainer />
      <Footer history={ history } />
    </div>
  );
};

// redux mapping functions //
const mapStateToProps = (state: RootState) => {
  return {
    clientState: state.clientState,
    appGeneralState: state.appGeneralState,
    roomState: state.roomState,
    serviceState: state.serviceState,
    diningEntertainmentState: state.diningEntertainmentState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    _handleSetGuestClient: (clientData: ClientData) => handleSetGuestClient(dispatch, clientData),
    _clearAppError: () => dispatch(clearAppError()),
    _clearSuccessState: () => dispatch(clearSuccessState()),
    _handleFetchRooms: (options: RoomFetchOptions) => handleFetchRooms(dispatch, options)
  };
};
export default (connect(mapStateToProps, mapDispatchToProps)(HomeComponent): React.AbstractComponent<Props>);