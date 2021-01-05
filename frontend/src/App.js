import React from 'react';
import './index.css';
import { StylesProvider } from "@material-ui/core/styles";
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import InternalComponent from './components/internal/main.components/InternalComponent';
import ExternalComponent from './components/external/ExternalComponent';
import PrivateRoute from './components/external/PrivateRoute';

// Including services
import ServiceContextProvider from './services/ServiceContext';
import auth from './services/auth-service';


function App() {
  const history = useHistory();
  const [isAuthenticated, setAuth] = React.useState(auth.isAuthenticated());

  const login = () => {
    auth.login(() => {
      history.replace('/');
    })
    setAuth(auth.isAuthenticated());
  }

  const logout = () => {
    auth.logout(() => {
      history.replace('/login');
    })
    setAuth(auth.isAuthenticated());
  }

  return (
    <ServiceContextProvider>
      <StylesProvider>
        <Switch>
          <Route path="/login" >
            <ExternalComponent login={login} />
          </Route>
          <PrivateRoute isAuthenticated={isAuthenticated} logout={logout} component={InternalComponent} />
        </Switch>
      </StylesProvider>
    </ServiceContextProvider>
  );
}

export default App;
// export { ServiceContext };
