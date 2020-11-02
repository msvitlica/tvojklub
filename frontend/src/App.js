import React from 'react';
import './index.css';
import { StylesProvider } from "@material-ui/core/styles";
import {
  Switch,
  Route
} from 'react-router-dom';
import InternalComponent from './components/internal/InternalComponent';
import ExternalComponent from './components/external/ExternalComponent';
import PrivateRoute from './components/external/PrivateRoute';

const authenticate = JSON.parse(localStorage.getItem('isAuthenticated')) ? JSON.parse(localStorage.getItem('isAuthenticated')).isAuthenticated : false;

function App() {
  const [isAuthenticated, setAuth] = React.useState(authenticate);

  const login = (cb) => {
    setAuth(true);
    cb();
    localStorage.setItem('isAuthenticated', JSON.stringify({ isAuthenticated: true }));
  }
  const logout = (cb) => {
    setAuth(false);
    cb();
    localStorage.setItem('isAuthenticated', JSON.stringify({ isAuthenticated: false }));
  }

  return (
    <StylesProvider>
      <Switch>
        <Route path='/login'>
          <ExternalComponent login={login} />
        </Route>
        <PrivateRoute isAuthenticated={isAuthenticated} logout={logout} component={InternalComponent} />
      </Switch>
    </StylesProvider>
  );
}

export default App;
