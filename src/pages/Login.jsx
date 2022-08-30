import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; // https://v5.reactrouter.com/web/api/Redirect
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loginNameInput: '',
    isDisabled: true,
    loading: false,
    redirect: false,
    // data: [],
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { loginNameInput } = this.state;
      const numMin = 3;

      if (loginNameInput.length >= numMin) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  onButtonClick = async () => {
    this.setState({ loading: true });
    const { loginNameInput } = this.state;
    await createUser({ name: loginNameInput });
    this.setState({ redirect: true });
  };

  render() {
    const { loginNameInput, isDisabled, loading, redirect } = this.state;
    const LoginScreen = (

      <form>
        <label htmlFor="loginNameInput">
          <p>Nome</p>
          <input
            value={ loginNameInput }
            data-testid="login-name-input"
            type="text"
            name="loginNameInput"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ this.onButtonClick }
        >
          Entrar
        </button>
      </form>

    );
    return (
      redirect ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            { loading ? <Loading />
              : LoginScreen }
          </div>
        )
    );
  }
}
