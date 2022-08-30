import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Favorites extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">Favorites</div>
      </>
    );
  }
}
