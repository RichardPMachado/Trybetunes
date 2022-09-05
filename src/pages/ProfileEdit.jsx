import React, { Component } from 'react';
import Header from '../componentes/Header';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
  };

  render() {
    const { name, email, image, description, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <div>
            <label htmlFor={ name }>
              Name
              <input type="text" id={ name } data-testid="edit-input-name" />
            </label>
            <label htmlFor={ email }>
              E-mail
              <input type="text" id={ email } data-testid="edit-input-email" />
            </label>
            <label htmlFor={ description }>
              Descrição
              <input
                type="text-area"
                id={ description }
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor={ image }>
              Url Imagem
              <input type="url" name="" id={ image }
                data-testid="edit-input-description"
              />
            </label>
            <button type="button" data-testid="edit-button-save">Salvar</button>
          </div>
          {isLoading ? <Loading /> : null}
        </div>
      </>
    );
  }
}
