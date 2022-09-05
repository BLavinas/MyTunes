import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    receivedName: '',
    isLoading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      receivedName: user.name,
      isLoading: false,
    });
  }

  render() {
    const { receivedName, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          {receivedName}
        </span>
        <div>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
      </header>
    );
  }
}
