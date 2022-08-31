import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      receivedName: '',
      isLoading: true,
    };
  }

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
        <p data-testid="header-user-name">
          {receivedName}
        </p>
      </header>
    );
  }
}
