// @flow
import * as React from "react";
import $ from "jquery";
import ObjectID from "bson-objectid";
// component imports //
import { ClientNotFoundComponent } from './shared/ClientNotFoundComponent';
import { HomePageServices } from "./services/home_page/HomePageServices";
import NavbarComponent from "./navbar/NavbarComponent";
import MainHeaderComponent from "./main_header/MainHeaderComponent";
import ContactForm from "./forms/ContactForm";
import Footer from "./footer/Footer";
import MessengerContainer from "./messaging/MessengerContainer";
import BookingForm from "./forms/BookingForm";
import SuccessComponent from "../display_components/SuccessComponent";
import ErrorComponent from "../display_components/ErrorComponent";
import RoomsIndexContainer from "./rooms/RoomsIndexContainer";
import DiningIndexContainer from "./dining/DiningIndex";
import ServicesIndexComponent from "./services/ServicesIndexComponent";
// redux imports //
import { connect } from "react-redux";
import { clearAppError, clearSuccessState } from "../../redux/actions/appGeneralActions";
import { handleFetchRooms } from "../../redux/actions/roomActions";
import { handleFetchServices } from "../../redux/actions/serviceActions";
// react router //
import { withRouter, Route, Switch } from "react-router-dom";
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
  _handleSetGuestClient: (data: any) => void;
  _handleFetchRooms: (options?: RoomFetchOptions) => Promise<boolean>;
  _handleFetchServices: (options?: any) => Promise<boolean>;
};

const HomeComponent = ({ 
  history, appGeneralState, clientState, roomState, serviceState, diningEntertainmentState,
  _clearAppError, _clearSuccessState, _handleSetGuestClient, _handleFetchRooms, _handleFetchServices }: Props): React.Node => {
  const [ successTimeout, setSuccessTimeout ] = React.useState(null);
  const [ errorTimeout, setErrorTimeout ] = React.useState(null);


  /*
  const unloadWindowHandler = (e: any): void => {
    //e.preventDefault();
    socket.emit("clientLeaving", clientState);
  };
  */

  window.onbeforeunload = () => {
    socket.emit("clientLeaving", clientState)
  }

  // set default client info on initial load and load data //
  React.useEffect(() => {
    // automatic form clear for error //
    navbarCollapseListener();
    setClient(_handleSetGuestClient)
      .then(() => {
        _handleFetchRooms({ live: true, limit: 1 })
      })
      .then((success) => {
      })
      .catch((error) => {
        console.log(error);
      });
      
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
    if (clientState._id && clientState.name) {
      socket.emit("receiveClientCredentials", clientState);
    }
  }, [ clientState ]);
   
  return (
    <div style={{ width: "100vw" }}>
      <NavbarComponent />
      <Route path={"/rooms"}>
        <RoomsIndexContainer 
          history={history}
          roomState={roomState}
          _handleFetchRooms={_handleFetchRooms}
        />
      </Route>
      <Route path={"/dining"}>
        <DiningIndexContainer
          history={history}
        />
      </Route>
      <Route path={"/services"}>
        <ServicesIndexComponent
          history={history}
          serviceState={ serviceState }
          _handleFetchServices={ _handleFetchServices }
        />
      </Route>
      <Route path={"/"} exact={true}>
        <MainHeaderComponent />
        <BookingForm />
        <HomePageServices history={ history } roomState={ roomState } diningEntertainmentState={ diningEntertainmentState } serviceState={ serviceState } />
        <ContactForm />
        <MessengerContainer />
      </Route>
      <Route component={ ClientNotFoundComponent } />
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
    _handleFetchRooms: (options: RoomFetchOptions) => handleFetchRooms(dispatch, options),
    _handleFetchServices: (options: any) => handleFetchServices(dispatch)
  };
};
export default (connect(mapStateToProps, mapDispatchToProps)(HomeComponent): React.AbstractComponent<Props>);