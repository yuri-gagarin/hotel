import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Container,
  Grid,
  Form
} from "semantic-ui-react";
// additional components //
import ErrorComponent from "../../display_components/ErrorComponent";
import SuccessComponent from "../../display_components/SuccessComponent";
// react router //
import { withRouter } from "react-router-dom";
// redux //
import { connect } from "react-redux"; 
import { loginUser } from "../../../redux/actions/apiActions";
import { clearAppError } from "../../../redux/actions/appGeneralActions";

const loginPageStyle = {
  container: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
  },
  titleRow: {
    //flex: 5,
    //border: "2px solid red",
    textAlign: "center",

  },
  formRow: {
    //flex: 8,
    //border: "2px solid green"
  }
}
const { titleRow, formRow } = loginPageStyle;



const AdminLoginComponent = (props) => {
  const { history, appGeneralState, handleUserLogin, clearAppError } = props;

  const [formData, setFormData] = useState({ 
    email: "", password: "", typingEmail: false, typingPass: false
  });
  const [sumbitDisabled, setSubmitDisabled] = useState(true);
  const [emailInputError, setEmailInputError] = useState(false);
  const [passInputError, setPassInputError] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(null);

  useEffect(() => {
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

  // error handlers - client side validation //
  const handleEmailError = () => {
    const { email, typingEmail } = formData;
    if (typingEmail && (email.length === 0)) {
      setEmailInputError({
        content: "Email required",
        pointing: "below"
      });
    } else {
      setEmailInputError(false);
    }
  };
  const handlePassError = () => {
    const { password, typingPass } = formData;
    if (typingPass && (password.length < 1)) {
      setPassInputError({
        content: "Password is required",
        pointing: "below"
      });
    } else {
      setPassInputError(false);
    }
  };
  // end error handlers - client side validation //
  // useEffect handlers for dynamic input validation //
  useEffect(() => {
    handleEmailError(formData);
    handlePassError(formData);
  }, [formData]);

  useEffect(() => {
    const { email, password } = formData;
    if (!passInputError && !emailInputError && email && password) {
      setSubmitDisabled(false);
    }
    else {
      setSubmitDisabled(true);
    }
  },  [emailInputError, passInputError, formData]);
  // end useEffect handlers for dynamic input validation //
  // form input and submit handlers //
  const handleEmailInput = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
      typingEmail: true
    });
  };
  const handlePassInput = (e) => {
    setFormData({
      ...formData, 
      password: e.target.value,
      typingPass: true
    });
  };
  const _handleUserLogin = () => {
    // api call to log in an administrator //
    const { email, password } = formData;
    const userData = {
      email: email,
      password: password
    };
    handleUserLogin(userData, history);
  };
  // end form input and sublit handlers //
  return (
    <Grid style={loginPageStyle.container}>
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={clearAppError} />
      <SuccessComponent appGeneralState={appGeneralState} clearSuccessState={"ok"} />
      <Grid.Row style={titleRow}>
        <Grid.Column width={16}>
          <h3>Login</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={formRow}>
        <Grid.Column computer={5} mobile={1}>

        </Grid.Column>
        <Grid.Column computer={6} mobile={14} paddding={0}>
        <Form>
          <Form.Input
            error={emailInputError}
            onChange={handleEmailInput}
            fluid
            label='Email'
            placeholder='...email'
          />
          <Form.Input
            error={passInputError}
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
// PropTypes validations //
AdminLoginComponent.propTypes = {
  history: PropTypes.object.isRequired,
  handleUserLogin:  PropTypes.func.isRequired
};
// redux mapState and mapDispatch //
const mapStateToProps = (state) => {
  return {
    adminState: state.adminState,
    appGeneralState: state.appGeneralState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleUserLogin: (userData, history) => loginUser(dispatch, userData, history),
    clearAppError: () => dispatch(clearAppError())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLoginComponent));