import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
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
    const info = await music[0];
    const data = await music.filter((_e, i) => i > 0);
    this.setState({
      data,
      artistName: info.artistName,
      collectionName: info.collectionName,
    });
  };

  getProps = async () => {
    const { match: { params: { id } } } = this.props;
    const info = await getMusics(id);
    return info;
  };

  getFavoriteSongs = async ({ target }) => {
    this.setState({ isLoading: true });
    const { id } = target;
    const music = await getMusics(id);
    await addSong(music);
    this.setState((prevState) => ({
      isFavorites: [...prevState.isFavorites, id],
      isLoading: false,
    }));
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
                    trackId={ music.trackId }
                    onChange={ this.getFavoriteSongs }
                    checked={ isFavorites.includes(music.trackId.toString()) }
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
