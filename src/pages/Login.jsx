import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      isBtnDisabled: true,
      isLoading: false,
      isRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { nameInput } = this.state;
      const minInputName = 3;
      if (nameInput.length >= minInputName) {
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

  btnOnClick = async () => {
    const { nameInput } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: nameInput });
    this.setState({
      isLoading: false,
      isRedirect: true,
    });
  };

  render() {
    const { isBtnDisabled, nameInput, isLoading, isRedirect } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <label htmlFor="nameInput">
          <input
            name="nameInput"
            id="nameInput"
            onChange={ this.handleChange }
            type="text"
            value={ nameInput }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.btnOnClick }
          disabled={ isBtnDisabled }
          data-testid="login-submit-button"
        >
          Entrar

        </button>

        {isRedirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
