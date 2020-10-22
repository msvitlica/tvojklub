import React from 'react';
import Signup from './Signup';

import { 
    Switch,
    Route
} from 'react-router-dom';


class ExternalComponent extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route path="/login" component={Signup} />
                <Route path="/signup" />
            </Switch>
        )
    }
}

export default ExternalComponent;