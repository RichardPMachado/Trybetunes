import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProfileEdit extends Component {
  render() {
    const { name, email, image, description, isR } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <h1>{ name }</h1>
        <h2>{ email }</h2>
        <img src={ image } alt={ name } />
        <p>{ description }</p>
        <p>{isR}</p>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isR: PropTypes.string.isRequired,
};
