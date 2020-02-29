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
  console.log(appGeneralState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // to automatically clear error and close error comopnent //
    const { error } = appGeneralState;
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        clearAppError();
      }, 5000);
    }
    if (!error && errorTimeout) {
      clearTimeout(errorTimeout);
    }
  }, [appGeneralState]);

  const handleEmailInut = (e) => {
    setEmail(e.target.value);
    setTyping(true);
  };
  const handlePassInput = (e) => {
    setPassword(e.target.value);
    setTyping(true);
  };
  const handleEmailError = () => {
    if (typing && (email.length === 0)) {
      return { content: 'Please enter your email', pointing: 'below' };
    }
    else return false;
  }
  const handlePasswordError = () => {

  }
  const _handleUserLogin = () => {
    // api call to log in an administrator //
    const userData = {
      email: email,
      password: password
    };
    handleUserLogin(userData, history);
  };
  return (
    <Grid style={loginPageStyle.container}>
      <ErrorComponent appGeneralState={appGeneralState} clearAppError={clearAppError} />
      <Grid.Row style={titleRow}>
        <Grid.Column width={16}>
          <h3>Login</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={formRow}>
        <Grid.Column width={5}>

        </Grid.Column>
        <Grid.Column width={6}>
        <Form>
          <Form.Input
            error={false}
            onChange={handleEmailInut}
            fluid
            label='Email'
            placeholder='...email'
          />
          <Form.Input
            error={false}
            onChange={handlePassInput}
            type={"password"}
            fluid
            label='Password'
            placeholder='...password'
          />
          <Button onClick={_handleUserLogin}>
            Login
          </Button>
        </Form>
        </Grid.Column>
        <Grid.Column width={5}>

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