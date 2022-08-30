import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../componentes/Header';
import ProfileEdit from './ProfileEdit';

export default class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <Switch>
            <Route
              path="/profile/edit"
              component={ ProfileEdit }
            />
          </Switch>
        </div>
      </>
    );
  }
}
