import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Switch, Route, Link } from 'react-router-dom';
import Header from '../componentes/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    isR: 'rferte',
  };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      isLoading: false,
    });
  };

  render() {
    const { name, email, image, description, isLoading, isR } = this.state;
    return (
      <>
        <Header />
        { isLoading ? <Loading /> : (
          <div data-testid="page-profile">
            <img src={ image } alt={ name } data-testid="profile-image" />
            <Link to="/profile/edit" Loading={ isR }>Editar perfil</Link>
            <h2>Nome</h2>
            <h3>{ name }</h3>
            <h2>E-mail</h2>
            <h3>{ email }</h3>
            <h2>Descrição</h2>
            <h3>{ description }</h3>
          </div>
        )}
      </>
    );
  }
}
