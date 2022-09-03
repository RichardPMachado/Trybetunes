import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route
            path="/search"
            render={ (props) => <Search { ...props } /> }
          />
          <Route
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route
            path="/favorites"
            render={ (props) => <Favorites { ...props } /> }
          />
          <Route
            path="/profile"
            render={ (props) => <Profile { ...props } /> }
          />
          <Route
            path="*"
            render={ (props) => <NotFound { ...props } /> }
          />
        </Switch>
      </div>

    );
  }
}

export default App;
