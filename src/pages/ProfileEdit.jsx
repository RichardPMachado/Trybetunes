import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../componentes/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    isRedirect: false,
    isDisabled: true,
  };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      isLoading: false,
    }, () => this.handleAllowClick());
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.handleAllowClick();
    });
  };

  handleAllowClick = () => {
    const { name, email, image, description } = this.state;
    const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const testEmail = email.match(reg);
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
    const test = name && testEmail && image && description;
    this.setState({ isDisabled: !test });
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ isLoading: true });
    await updateUser({ name, email, image, description });
    this.setState({ isRedirect: true });
  };

  render() {
    const { name, email, image, description,
      isLoading, isRedirect, isDisabled } = this.state;
    if (isRedirect) return <Redirect to="/profile" />;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {isLoading ? <Loading />
            : (
              <form>
                <label htmlFor="edit-input-name">
                  Name
                  <input
                    type="text"
                    name="name"
                    id="edit-input-name"
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <label htmlFor="edit-input-email">
                  E-mail
                  <input
                    placeholder="Escreva seu E-mail"
                    type="text"
                    name="email"
                    value={ email }
                    id="edit-input-email"
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                  />
                </label>
                <label htmlFor="edit-input-description">
                  Descrição
                  <input
                    type="text"
                    name="description"
                    id="edit-input-description"
                    onChange={ this.handleChange }
                    value={ description }
                    data-testid="edit-input-description"
                  />
                </label>
                <label htmlFor="edit-input-image">
                  Url Imagem
                  <input
                    type="url"
                    name="image"
                    id="edit-input-image"
                    value={ image }
                    onChange={ this.handleChange }
                    data-testid="edit-input-image"
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                >
                  Salvar
                </button>
              </form>
            )}
        </div>
      </>
    );
  }
}
