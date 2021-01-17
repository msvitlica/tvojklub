import React, { Component } from 'react';
import TrainingObject from './TrainingObject';

export const TrainingContext = React.createContext();
const training = new TrainingObject();


class TrainingContextProvider extends Component {
    state = {
        training
    }
    render() {
        return (
            <TrainingContext.Provider value={{ ...this.state}}>
                {this.props.children}
            </TrainingContext.Provider>
        )
    }
}

export default TrainingContextProvider;