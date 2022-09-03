import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    data: [],
    isLoading: false,
    isFavorites: [],
  };

  componentDidMount() {
    this.handleMusic();
  }

  handleMusic = async () => {
    const music = await this.getProps();
    const favoritesMusics = await getFavoriteSongs();
    const info = await music[0];
    const data = await music.filter((_e, i) => i > 0);
    this.setState({
      data: [...data],
      artistName: info.artistName,
      collectionName: info.collectionName,
      isFavorites: [...favoritesMusics],
      isLoading: false,
    });
  };

  getProps = async () => {
    const { match: { params: { id } } } = this.props;
    const info = await getMusics(id);
    return info;
  };

  handleFavoriteSongs = async ({ target }) => {
    this.setState({ isLoading: true });
    const { id, name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, async () => {
      const musics = await getFavoriteSongs();
      await addSong(id);
      this.setState((prevState) => ({
        isFavorites: [...prevState.isFavorites, id, musics],
        isLoading: false,
      }));
    });
  };

  render() {
    const { artistName, collectionName, data, isFavorites, isLoading } = this.state;
    return (
      <>
        <Header />
        {
          isLoading ? <Loading />
            : (
              <div data-testid="page-album">
                <h1>Album</h1>
                <h2 data-testid="album-name">{collectionName}</h2>
                <h3 data-testid="artist-name">{artistName}</h3>
                {data.map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId.toString() }
                    onChange={ this.handleFavoriteSongs }
                    checked={ isFavorites.some(
                      (e) => e === music.trackId.toString()
                      || e.trackId === music.trackId,
                    ) }
                  />))}
              </div>
            )
        }
      </>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
