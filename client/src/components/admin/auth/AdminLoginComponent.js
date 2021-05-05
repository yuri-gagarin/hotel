//@flow
import * as React from "react";
import { Button, Container, Grid, Form, FormInput } from "semantic-ui-react";
// additional components //
import ErrorComponent from "../../display_components/ErrorComponent";
import SuccessComponent from "../../display_components/SuccessComponent";
// react router //
import { withRouter } from "react-router-dom";
// redux //
import { connect } from "react-redux"; 
import { loginUser } from "../../../redux/actions/apiActions";
import { clearAppError } from "../../../redux/actions/appGeneralActions";
// types //
import type { RootState, AppAction , Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/adminLoginComponent.module.css";

type FormState = {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
};

type WrapperProps = {

};
type RouterProps = {
  ...WrapperProps;
  history: RouterHistory;
}
type Props = {
  ...RouterProps;
  adminState: any;
  appGeneralState: any;
  handleUserLogin: (userData: { email: string, password: string }) => Promise<boolean>;
  clearAppError: () => void;
};

const AdminLoginComponent = ({ history, adminState, appGeneralState, handleUserLogin, clearAppError }: Props): React.Node => {
  const [ formState, setFormState ] = React.useState<FormState>({ email: "", password: "", emailError: "", passwordError: "" });
  const [ sumbitDisabled, setSubmitDisabled ] = React.useState(true);
  const [ errorTimeout, setErrorTimeout ] = React.useState(null);

  React.useEffect(() => {
    // to automatically clear error and close error comopnent //
    const { error } = appGeneralState;
    if (error) {
      setErrorTimeout(setTimeout(() => {
        clearAppError();
      }, 5000));
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
      setErrorTimeout(null);
    }
    // clean up if unmounted //
    return errorTimeout ? clearTimeout(errorTimeout) : undefined;
  }, [appGeneralState]);

  React.useEffect(() => {
    const { email, password, emailError, passwordError } = formState;
    if (email && password && !emailError && !passwordError) {
      setSubmitDisabled(false);
    }
    else {
      setSubmitDisabled(true);
    }
  },  [ formState ]);
  // end useEffect handlers for dynamic input validation //
  // form input and submit handlers //
  const handleEmailInput = (e, data: any) => {
    if (data.value.length === 0) {
      setFormState({ ...formState, email: data.value, emailError: "Please enter your email..." });
    } else {
      setFormState({ ...formState, email: data.value, emailError: "" });
    }
  };
  const handlePassInput = (e, data: any) => {
   if (data.value.length === 0) {
     setFormState({ ...formState, password: data.value, passwordError: "Please enter your password..." })
   } else {
     setFormState({ ...formState, password: data.value, passwordError: "" });
   }
  };
  const _handleUserLogin = () => {
    // api call to log in an administrator //
    const { email, password } = formState;
    const userData = {
      email: email,
      password: password
    };
    return handleUserLogin(userData)
      .then((success) => {
        if (success) {
          history.push("/admin/dash");
        }
      })
  };
  // end form input and sublit handlers //
  return (
    <Grid className={ styles.loginComponentGrid }>
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={clearAppError} />
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={"ok"} />
      <Grid.Row centered>
        <Grid.Column width={16} textAlign="center">
          <h3>Login</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={5} mobile={1}>

        </Grid.Column>
        <Grid.Column computer={6} mobile={14} paddding={0}>
        <Form>
          <Form.Input
            error={ formState.emailError ? { content: formState.emailError, pointing: "above" } : null }
            onChange={handleEmailInput}
            fluid
            label='Email'
            placeholder='...email'
          />
          <Form.Input
            error={ formState.passwordError ? { content: formState.passwordError, pointing: "above" } : null }
            onChange={handlePassInput}
            type={"password"}
            fluid
            label='Password'
            placeholder='...password'
          />
          <Button onClick={_handleUserLogin} disabled={sumbitDisabled}>
            Login
          </Button>
        </Form>
        </Grid.Column>
        <Grid.Column computer={5} mobile={1}>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};


// redux mapState and mapDispatch //
const mapStateToProps = (state: RootState) => {
  return {
    adminState: state.adminState,
    appGeneralState: state.appGeneralState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    handleUserLogin: (userData: any, history: RouterHistory) => loginUser(dispatch, userData, history),
    clearAppError: () => dispatch(clearAppError())
  };
};

export default (withRouter((connect(mapStateToProps, mapDispatchToProps)(AdminLoginComponent): React.AbstractComponent<RouterProps>)): React.AbstractComponent<WrapperProps>);