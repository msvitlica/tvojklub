import React from 'react';
import { Members } from './Members';
import NavBar from './NavBar';
import { TrainngList } from './TrainingList';


export default class InternalComponent extends React.Component {

    render() {
        return (
            <div>
                <NavBar title="Lista Treninga" />
                <TrainngList></TrainngList>
            </div>
        )
    }

}

