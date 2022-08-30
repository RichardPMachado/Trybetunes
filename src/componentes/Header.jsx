import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loginNameInput: 'Richard',
    loading: true,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const userInfo = await getUser();
    this.setState({ loginNameInput: userInfo.name, loading: false });
  };

  render() {
    const { loginNameInput, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : <h1 data-testid="header-user-name">{ loginNameInput }</h1> }
      </header>
    );
  }
}
