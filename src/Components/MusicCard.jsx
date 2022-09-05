import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleChange = async ({ target }, music) => {
    const { gotFavorites } = this.props;
    this.setState({
      isLoading: true,
    });
    if (target.checked === true) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    await gotFavorites();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      music,
      receivedFavorites,
    } = this.props;

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
            onChange={ (checked) => this.handleChange(checked, music) }
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={
              receivedFavorites
                .some((favorite) => favorite.trackId === music.trackId)
            }
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
  receivedFavorites: PropTypes.arrayOf(Object).isRequired,
  gotFavorites: PropTypes.func.isRequired,
};
