import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
// import Album from './Album';

export default class Search extends Component {
  state = {
    nomeArtista: '',
    isDisabled: true,
    loading: false,
    hasSearch: false,
    artistaPesquisado: '',
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    const min = 2;
    this.setState({ nomeArtista: value }, () => {
      const isTrueOrFalse = value.length < min;
      this.setState({ isDisabled: isTrueOrFalse });
    });
  };

  onButtonClick = async () => {
    const { nomeArtista } = this.state;
    this.setState({ loading: true });
    const data = await searchAlbumsAPI(nomeArtista);
    this.setState((prevState) => ({
      nomeArtista: '',
      artistaPesquisado: prevState.nomeArtista,
      loading: false,
      hasSearch: true,
      data,
    }));
  };

  render() {
    const { nomeArtista, isDisabled, loading,
      hasSearch, data, artistaPesquisado } = this.state;
    return (
      <>
        <Header />
        { loading
          ? <Loading />
          : (
            <div data-testid="page-search">
              <h1>Search</h1>
              <form>
                <label htmlFor="nomeArtista">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    name="nomeArtista"
                    value={ nomeArtista }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                  onClick={ this.onButtonClick }
                >
                  Pesquisar
                </button>
              </form>
              { hasSearch
                && (
                  <>
                    <p>
                      {`Resultado de álbuns de: ${artistaPesquisado}`}
                    </p>
                    <section>
                      {data.length === 0 ? <p>Nenhum álbum foi encontrado</p>
                        : data.map((e) => (
                          <Link
                            key={ e.collectionId }
                            to={ `/album/${e.collectionId}` }
                            data-testid={ `link-to-album-${e.collectionId}` }
                          >
                            <img
                              alt={ e.collectionName }
                              src={ e.artworkUrl100 }
                            />
                            <h4>{e.collectionName}</h4>
                            <h4>{e.artistName}</h4>
                          </Link>))}
                    </section>
                  </>
                )}
            </div>
          )}
      </>
    );
  }
}
