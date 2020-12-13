import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import LoaderScreen from '../Loader/Loader';
import axios from 'axios';
import { setToken, saveUser,saveUserId} from '../../utils/storage';
import Style from './Login.module.css'

require('dotenv').config();

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      Loading: false,
      error: false,
      showPassword:false
    }
  }
  handleNameChange(event) { this.setState({ email: event.target.value }); }
  handlePasswordChange(event) { this.setState({ password: event.target.value }); }
  changePasswordFieldType(event){this.setState({showPassword:!this.state.showPassword})}

  renderRoutes() {
    var errorMsg;
    var passwordFieldType = this.state.showPassword == false ? "password" : "text";
    if (this.state.error)
      errorMsg = <span className={Style["error-msg"]}>Email or Password Wrong</span>;
    if (this.state.Loading === false) {
      return (
        <div className={Style["wrapper"]}>
          <div className={Style["form-wrapper"]}>
            <Form className={Style["login-form"]} >
              <h1>Login</h1>
              <FormGroup>
                <Label> Email </Label>
                <Input invalid={this.state.error} className={Style["email"]} type="email" placeholder="Email" onChange={this.handleNameChange.bind(this)} />
              </FormGroup>
              <FormGroup>
                <Label> Password </Label>
                <Input invalid={this.state.error} className={Style["email"]} type={passwordFieldType} placeholder="Password" onChange={this.handlePasswordChange.bind(this)} />
                <span className={Style["showPassword"]} onClick={this.changePasswordFieldType.bind(this)}>{this.state.showPassword === true ? 'Hide' : 'Show'}</span>
              </FormGroup>
              {errorMsg}
              <Button type="submit" className="btn-lg btn-dark btn-block" onClick={this.onSubmit} >Login</Button>
              <div className="text-center signuplinks">
                <a href="/sign-up">Sign up</a>
                <span className="p-2">|</span>
                <a href="/forgotPassword">Forgot Password</a>
              </div>
            </Form>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={Style["wrapper"]}>
          <div className={Style["loaderscreen"]}>
            <LoaderScreen />
          </div>
        </div>
      );
    }
  }


  onSubmit = async (e) => {

    e.preventDefault();
    if (this.state.email === '') {
      this.setState({ error: true });
    } else if (this.state.password === '') {
      this.setState({ error: true });
    } else {

      this.setState({ Loading: true, error: false });
      let username = this.state.email;
      let password = this.state.password;

      const payload = {
        "email": username,
        "password": password
      }
      const request = {
        method: 'post',
        // url: process.env.REACT_APP_LOGIN_URL,
        url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_LOGIN_API_PATH}`,
        data: payload
      }

      try {
        const response = await axios(request)
        // console.log(response);
        if (response.data.token !== null && response.data.token !== '') {
          response.data.token = response.data.token.access_token;
          setToken(response.data.token);
          saveUser(response.data);
          saveUserId(response.data.userId);
          this.props.history.push("/dashboard");
        }
      }
      catch (error) {
        console.log("Error:", error);
        this.setState({ error: true });
      }
      this.setState({ Loading: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.renderRoutes()}
      </React.Fragment>
    );
  }
}

export default Login;
