import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loginNameInput: '',
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
        <p>Espaço para Logo</p>
        <Link to="/search"><p data-testid="link-to-search">Search</p></Link>
        <Link to="/favorites"><p data-testid="link-to-favorites">Favorites</p></Link>
        <Link to="/profile"><p data-testid="link-to-profile">Profile</p></Link>
        { loading ? <Loading />
          : <h2 data-testid="header-user-name">{ loginNameInput }</h2> }
      </header>
    );
  }
}
