import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  state = {
    receivedMusics: [],
    receivedBand: '',
    receivedAlbum: '',
    receveidCover: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const albumInfo = album[0];
    const { artistName, collectionName, artworkUrl100 } = albumInfo;
    const musics = album.filter((music) => music.trackName);
    this.setState({
      receivedMusics: musics,
      receivedAlbum: collectionName,
      receivedBand: artistName,
      receivedCover: artworkUrl100,
    });
  }

  render() {
    const { receivedMusics, receivedAlbum, receivedBand, receivedCover } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{receivedBand}</p>
          <p data-testid="album-name">{receivedAlbum}</p>
          <img src={ receivedCover } alt={ receivedAlbum } />
        </div>
        {receivedMusics.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />))}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
