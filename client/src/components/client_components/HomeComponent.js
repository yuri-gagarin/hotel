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
import { setGuestClient } from "../../redux/actions/clientActions";
import { navbarCollapseListener } from "../helpers/componentHelpers";
import { socket } from "./../../App";
// types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch } from "../../redux/reducers/_helpers/createReducer";
import type { RoomFetchOptions, RoomState, RoomAction } from "../../redux/reducers/rooms/flowTypes";


const handleNewClient = () => {
  return {
    _id: ObjectID.generate(Date.now()).toString(),
    firstName: "guest",
    email: null
  };
};
type WrapperProps = {
  history: RouterHistory;
}
type Props = {
  ...WrapperProps;
  appGeneralState: any;
  clientState: any;
  _clearAppError: () => void;
  _clearSuccessState: () => void;
  _setGuestClient: (data: any) => void;
  _handleFetchRooms: (options?: RoomFetchOptions) => Promise<boolean>;
};
const HomeComponent = ({history, appGeneralState, clientState, _clearAppError, _clearSuccessState, _setGuestClient, _handleFetchRooms }: Props): React.Node => {
  const [successTimeout, setSuccessTimeout] = React.useState(null);
  const [errorTimeout, setErrorTimeout] = React.useState(null);

  const unloadWindowHandler = () => {
    socket.emit("clientLeaving", clientState);
  };
  // set default client info on initial load //
  React.useEffect(() => {
    // automatic form clear for error //
   navbarCollapseListener();
   _handleFetchRooms({ live: true, limit: 1 })
    .then((success) => {
      if(success) {
        // check for saved user data in localStorage //
        const clientId = localStorage.getItem("hotelGuestClientId");
        const firstName = localStorage.getItem("hotelGuestClientName");
        if (clientId && firstName) {
          _setGuestClient({ _id: clientId, firstName: firstName });
        } else {
          _setGuestClient(handleNewClient());
        }
      }
    })
   
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
  // set localStorage items if they do not exist //
  // listener for closed window or navigation away //
  React.useEffect(() => {
    const storedId = localStorage.getItem("hotelGuestClientId");
    const storedName = localStorage.getItem("hotelGuestClientName");
    const { _id, firstName } = clientState;
    if ( _id && firstName ) {
      if (!storedId || !storedName) {
        localStorage.setItem("hotelGuestClientId", _id);
        localStorage.setItem("hotelGuestClientName", firstName);
      }
      window.addEventListener("beforeunload", unloadWindowHandler);
      // emit client information to the server //
      socket.emit("sendClientCredentials",  clientState);
    }
  }, [clientState])
   
  return (
    <div style={{ width: "100vw" }}>
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={_clearSuccessState} />
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={_clearAppError} />
      <NavbarComponent />
      <MainHeaderComponent />
      <BookingForm />
      <HomePageServices history={ history } />
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
    roomState: state.roomState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<RoomAction>) => {
  return {
    _setGuestClient: (userData: any) => dispatch(setGuestClient(userData)),
    _clearAppError: () => dispatch(clearAppError()),
    _clearSuccessState: () => dispatch(clearSuccessState()),
    _handleFetchRooms: (options: RoomFetchOptions) => handleFetchRooms(dispatch, options)
  };
};
export default (connect(mapStateToProps, mapDispatchToProps)(HomeComponent): React.AbstractComponent<Props>);