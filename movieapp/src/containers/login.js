import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  withRouter
} from 'react-router-dom'
import { loginAction } from "../store/reducers/user";

class Login extends React.Component {

  state = {
    login: undefined
  }

  _submit = (event) => {
    event.preventDefault()
    this.props.dispatch(loginAction(this.state.login, this._onLoginSuccess, this._onLoginFail))
  }

  _onLoginSuccess = () => {
    this.props.history.push("/dashboard")
  }

  _onLoginFail = (err) => {
    this.props.history.push("/login")
    this.setState({ loginFaild: true, errorMessage: err })
  }

  _onLoginIdChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    console.log("login componet")
    return (
      <form onSubmit={this._submit}>
        <Container>
          <h1>Login in Movie App</h1>
          <Input name="login" type="text" onChange={e => this._onLoginIdChange(e)} />
          {this.state.loginFaild && <ErrorMessage>{this.state.errorMessage}</ErrorMessage>}
          <SubmitButton type="submit" value="Submit" onClick={this._submit} />
        </Container>
      </form>
    );
  }
}

export default withRouter(connect()(Login))

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${window.innerWidth}px;
  min-height: ${window.innerHeight}px;
`;

const Input = styled.input`
  padding: 0.5em;
  color: black;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  height: 50px;
  width: ${window.innerWidth * 0.4}px;
  min-width: 200px;
  font-size: 16px;
`;
const SubmitButton = styled.input`
  padding: 0.5em;
  margin: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  font-color: black;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`