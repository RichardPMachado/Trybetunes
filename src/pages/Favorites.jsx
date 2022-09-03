import React, { Component } from 'react';
import Header from '../componentes/Header';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import MusicCard from '../componentes/MusicCard';

export default class Favorites extends Component {
  // state = {
  //   favoritesMusics: [],
  // };

  // componentDidMount() {
  //   this.handleFavoriteMusics();
  // }

  // handleFavoriteMusics = async () => {
  //   const favoritesongs = await getFavoriteSongs();
  //   const favoritesMusics = favoritesongs[0];
  //   this.setState({
  //     favoritesMusics: [...favoritesMusics],
  //   });
  // };

  render() {
    // const { favoritesMusics } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">Favorites</div>
        {/* {favoritesMusics.map((music) => (
          <MusicCard
            key={ music.trackId.toString() }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId.toString() }
            onChange={ this.handleFavoriteMusics }
            checked
          />))} */}
      </>
    );
  }
}
