import React, { Component } from 'react';
import Header from '../componentes/Header';
// import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../componentes/MusicCard';

export default class Favorites extends Component {
  state = {
    favoritesMusics: [],
    isLoading: true,
  };

  componentDidMount() {
    // this.setState({ isLoading: true });
    this.handleFavoriteMusics();
  }

  handleFavoriteMusics = async () => {
    const favoriteSongs = await getFavoriteSongs();
    // const a = favoriteSongs;
    // console.log(a);
    this.setState({
      favoritesMusics: favoriteSongs,
      isLoading: false,
    });
  };

  removeFavorites = async (event) => {
    // const { id } = target;
    this.setState({ isLoading: true });
    // const info = await getMusics(id);
    await removeSong(event);
    this.handleFavoriteMusics();
  };

  render() {
    const { favoritesMusics, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading />
          : (
            favoritesMusics.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ () => this.removeFavorites(music) }
                checked
              />))
          )}

      </div>
    );
  }
}
