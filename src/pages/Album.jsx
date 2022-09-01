import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';

export default class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    data: [],
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

  render() {
    const { artistName, collectionName, data } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          <h2 data-testid="album-name">{ collectionName }</h2>
          <h3 data-testid="artist-name">{ artistName }</h3>
        </div>
        {data.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />))}
      </>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
