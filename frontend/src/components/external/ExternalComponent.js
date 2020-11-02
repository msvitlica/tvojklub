import React from 'react';
import Login from './Login';

import {
    Switch,
    Route
} from 'react-router-dom';


class ExternalComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route path="/login">
                    <Login login={this.props.login} />
                </Route>
                <Route path="/signup" />
            </Switch>
        )
    }
}

export default ExternalComponent;