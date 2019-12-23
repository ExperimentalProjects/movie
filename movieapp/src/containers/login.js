import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { loginAction } from "../store/reducers/user";

class Login extends React.Component {

  state = {
    login: undefined
  }

  _submit = (event) => {
    console.log({event, state: this.state})
    event.preventDefault()

    this.props.dispatch(loginAction(this.state.login))
  }

  _onLoginIdChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }


  render() {
    return (
      <form onSubmit={this._submit}>
        <Container>
          {/* <h1>Login:</h1> */}
          <Input name="login" type="text"  onChange={e => this._onLoginIdChange(e)}/>
          <SubmitButton type="submit" value="Submit" onClick={this._submit}/>
        </Container>
      </form>
    );
  }
}

export default connect()(Login)

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
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  height: 50px;
  width: ${window.innerWidth * 0.4}px;
  min-width: 200px;
`;
const SubmitButton = styled.input`
  padding: 0.5em;
  width: 100px;
  height: 50px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  font-color: black;
`;
