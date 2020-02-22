import React, { useState } from "react";
import { 
  Button,
  Container,
  Grid,
  Form
} from "semantic-ui-react";
// react router //
import { withRouter } from "react-router-dom";
// redux //
import { connect } from "react-redux"; 

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typing, setTyping] = useState(false);

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
  const handleLogin = () => {
    // api call to log in an administrator //
    console.log(email);
    console.log(password);
  };
  return (
    <Grid style={loginPageStyle.container}>
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
          <Button onClick={handleLogin}>
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

const mapStateToProps = (state) => {
  return {
    
  }
};
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLoginComponent));