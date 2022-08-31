import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Search extends Component {
  state = {
    nomeArtista: '',
    isDisabled: true,
    // loading: false,
    // redirect: false,
    // data: [],
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const min = 2;
    this.setState({ [name]: value }, () => {
      const isTrueOrFalse = value.length < min;
      this.setState({ isDisabled: isTrueOrFalse });
    });
  };

  render() {
    const { nomeArtista, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="artistName">
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista<"
                name="nomeArtista"
                onChange={ this.onInputChange }
                value={ nomeArtista }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}
