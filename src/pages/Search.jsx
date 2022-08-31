import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      searchArtist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchArtist } = this.state;
      const minInputName = 2;
      if (searchArtist.length >= minInputName) {
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

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtist">
            <input
              name="searchArtist"
              onChange={ this.handleChange }
              type="text"
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            disabled={ isBtnDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
