import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
      </>
    );
  }
}
