// @flow
import * as React from "react";
import axios from "axios";
// Higer order comoponent to protect some of admin UI components //
// should check and verify admin login and direct to the correct component //
// otherwise should display a default 401 NOT ALLOWED page //

type Props = {
  ReactCmponent: React.Node;
};
type LocalState = {
  loaded: boolean;
  validLogin: boolean;
}

export const ProtectedRoute = ({ ReactCmponent }: Props): React.Node => {

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
      setLocalState({ loaded: true, validLogin: false });
    }
  }, []);

  return (
    localState.loaded
    ? 
      localState.validLogin 
      ?
        ReactCmponent
      :
      <div>

      </div>
    :
    <div>
      <hh3>Not Allowed</hh3>
    </div>
  );
};