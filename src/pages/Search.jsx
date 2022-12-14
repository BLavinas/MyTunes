import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isBtnDisabled: true,
    searchAlbum: '',
    isLoading: false,
    artistFound: [],
    requestedAlbum: '',

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchAlbum } = this.state;
      const minInputName = 2;
      this.setState({
        isBtnDisabled: searchAlbum.length < minInputName,
      });
      // // Refatorado
      //  if (searchAlbum.length >= minInputName) {
      //   this.setState({
      //     isBtnDisabled: false,
      //   });
      // } else {
      //   this.setState({
      //     isBtnDisabled: true,
      //   });
      // }
    });
  };

  handleClick = async () => {
    const { searchAlbum } = this.state;
    this.setState({
      requestedAlbum: searchAlbum,
      searchAlbum: '',
      isLoading: true,
    });
    const artistFound = await searchAlbumsAPI(searchAlbum);
    this.setState({
      artistFound,
      isLoading: false,
    });
  };

  render() {
    const {
      isBtnDisabled,
      searchAlbum,
      isLoading,
      artistFound,
      requestedAlbum,
    } = this.state;

    return (

      <div data-testid="page-search">
        <Header />
        {(isLoading ? <Loading /> : (
          <form>
            <label htmlFor="searchAlbum">
              <input
                name="searchAlbum"
                onChange={ this.handleChange }
                type="text"
                data-testid="search-artist-input"
                value={ searchAlbum }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ isBtnDisabled }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        ))}
        <div>
          {
            artistFound.length === 0
            && requestedAlbum !== ''
            && <p>Nenhum ??lbum foi encontrado</p>
          }
          {(artistFound.length > 0
            && (
              <div>
                <h3>
                  {`Resultado de ??lbuns de: ${requestedAlbum}`}
                </h3>
                {
                  artistFound.map((album) => (
                    <div key={ album.collectionId }>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        {album.collectionName}
                        <div>
                          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            ))}
        </div>
      </div>

    );
  }
}

export default Search;
