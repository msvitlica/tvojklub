import React, { useState } from 'react';
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
import ErrorBoundary from './components/internal/error-boundary.component/ErrorBoundary';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// Including services
import ServiceContextProvider from './services/ServiceContext';
import auth from './services/auth-service';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const history = useHistory();
  const [isAuthenticated, setAuth] = React.useState(auth.isAuthenticated());
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [severity, setSeverity] = useState('');

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

  const onShowMessage = (message, svt) => {
    setSeverity(svt);
    setSnackMessage(message);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ServiceContextProvider onShowMessage={onShowMessage}>
      <StylesProvider>
        <ErrorBoundary>
          <Switch>
            <Route path="/login" >
              <ExternalComponent login={login} />
            </Route>
            <PrivateRoute isAuthenticated={isAuthenticated} logout={logout} component={InternalComponent} />
          </Switch>
        </ErrorBoundary>
        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
              {snackMessage}
            </Alert>
          </Snackbar>
        </div>
      </StylesProvider>
    </ServiceContextProvider>
  );
}

export default App;
// export { ServiceContext };
