import React from 'react';
import './index.css';
import { StylesProvider } from "@material-ui/core/styles";
import { 
  Switch,
  Route 
} from 'react-router-dom';
import InternalComponent from './components/internal/InternalComponent';
import ExternalComponent from './components/external/ExternalComponent'

function App() {
  return (
    <StylesProvider>
      <Switch>
        <Route path='/login' component={ExternalComponent} />
        <Route path='/' component={InternalComponent} />
      </Switch>
    </StylesProvider>
  );
}

export default App;
