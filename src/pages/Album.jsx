import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    // console.log(data);
    this.setState({
      data,
      artistName: info.artistName,
      collectionName: info.collectionName,
      isFavorites: favoritesMusics,
    });
  };

  getProps = async () => {
    const { match: { params: { id } } } = this.props;
    const info = await getMusics(id);
    return info;
  };

  removeFavorites = async (id) => {
    this.setState({
      isLoading: true,
    }, async () => {
      const info = await getMusics(id);
      await removeSong(info[0]);
      this.setState({ isLoading: false });
    });
  };

  addFavorites = async (id) => {
    this.setState({ isLoading: true,
    }, async () => {
    // const { id, name } = target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // console.log(target.checked);
    // this.setState({
    //   [name]: value,
    // }, async () => {
    // const musics = await getFavoriteSongs();
      const info = await getMusics(id);
      await addSong(info[0]);
      this.setState({ isLoading: false });
    // this.setState((prevState) => ({
    //   isFavorites: [...prevState.isFavorites, id, musics],
    //   isLoading: false,
    // }));
    });
  };

  handleFavoriteSongs = ({ target }) => {
    const { checked, id } = target;

    if (!checked) {
      this.removeFavorites(id);
    } else this.addFavorites(id);
  };

  render() {
    const { artistName, collectionName, data, isFavorites, isLoading } = this.state;
    return (
      <>
        <Header />

        <div data-testid="page-album">
          <h1>Album</h1>
          <h2 data-testid="album-name">{collectionName}</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
          {data.map((music) => (
            <MusicCard
              key={ music.trackId.toString() }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId.toString() }
              onChange={ this.handleFavoriteSongs }
              checked={ isFavorites.some(
                (e) => e.trackName === music.trackName
                      || e.trackId === music.trackId,
              ) }
            />))}
        </div>

        {
          isLoading && <Loading />
        }
      </>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
