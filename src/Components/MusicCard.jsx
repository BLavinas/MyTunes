import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,

  };

  handleClick = async (music) => {
    this.setState({
      isLoading: true,
    });
    await addSong(music);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        { isLoading && <Loading /> }
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento

          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            onClick={ () => this.handleClick(music) }
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape(Object).isRequired,
};
