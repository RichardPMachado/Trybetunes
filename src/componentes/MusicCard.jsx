import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId, checked, onChange } = this.props;
    console.log(checked);
    return (
      <div>
        <p>{ trackName }</p>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <span>Favorita</span>
          <input
            type="checkbox"
            name={ `${trackName}` }
            id={ trackId }
            onChange={ onChange }
            defaultChecked={ checked } // https://bobbyhadz.com/blog/react-set-checkbox-checked  - tratar checkbox com boleano
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
