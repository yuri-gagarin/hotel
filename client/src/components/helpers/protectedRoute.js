// @flow
import * as React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
// additional components //
import AdminLoginComponent from "../admin/auth/AdminLoginComponent"
import { NotAllowedComponent } from "../display_components/NotAllowedComponent";
// types //
import type { RouterHistory } from "react-router-dom";
// constants //
import { adminRoutes } from "../../routes/appRoutes";
// Higer order comoponent to protect some of admin UI components //
// should check and verify admin login and direct to the correct component //
// otherwise should display a default 401 NOT ALLOWED page //

type Props = {
  clientPath: string;
  component: React$ComponentType<any>;
  history: RouterHistory;
};
type LocalState = {
  loaded: boolean;
  validLogin: boolean;
}

export const ProtectedRoute = ({ clientPath, component, history }: Props): React.Node => {

  const [ localState, setLocalState ] = React.useState<LocalState>({ loaded: false, validLogin: false });
  // get token or user session //
  React.useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && typeof token === "string") {
      // api call to check login validity ? //
      const axiosOpts = {
        url: `/api/validate_admin_login/${token}`,
        method: "GET"
      };
      axios(axiosOpts)
        .then((response) => {
          const { status, data } = response;
          const { responseMsg, validLogin }: { responseMsg: string, validLogin: boolean } = data;
          setLocalState({ loaded: true, validLogin });
        })
        .catch((err) => {
          // error handling //
          setLocalState({ loaded: true, validLogin: false });
        });
    } else {
      setLocalState({ loaded: true, validLogin: true });
    }
  }, []);

  return (
    localState.loaded
    ? 
      localState.validLogin 
      ?
        <Route path={ clientPath } component={ component } />
      :
        <NotAllowedComponent history={ history } />
    :
    <div style={{ position: "fixed", top: "0", right: "0", bottom: "0", left: "0", backgroundColor: "red" }}>
      <h3>Loading</h3>
    </div>
  );
};