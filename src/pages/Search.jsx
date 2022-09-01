import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      searchAlbum: '',
      isLoading: false,
      artistFound: [],
      inputAlbum: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchAlbum } = this.state;
      const minInputName = 2;
      if (searchAlbum.length >= minInputName) {
        this.setState({
          isBtnDisabled: false,
        });
      } else {
        this.setState({
          isBtnDisabled: true,
        });
      }
    });
  };

  handleClick = async () => {
    const { searchAlbum } = this.state;
    this.setState({
      inputAlbum: searchAlbum,
      searchAlbum: '',
      isLoading: true,
    });
    const responseApi = await searchAlbumsAPI(searchAlbum);
    this.setState({
      artistFound: responseApi,
      isLoading: false,
    });
  };

  render() {
    const { isBtnDisabled, searchAlbum, isLoading, artistFound, inputAlbum } = this.state;

    return (

      <div data-testid="page-search">
        <Header />
        {(isLoading

          ? <Loading />
          : (
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
            && inputAlbum !== ''
            && <p>Nenhum álbum foi encontrado</p>
          }
          {(artistFound.length > 0
            && (
              <div>
                <h3>
                  {`Resultado de álbuns de: ${inputAlbum}`}
                </h3>
                {
                  artistFound.map((album) => (
                    <Link
                      key={ album.collectionId }
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      {album.collectionName}
                    </Link>
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
