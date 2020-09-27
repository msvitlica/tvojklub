import React from 'react';
import NavBar from './NavBar';
import { Members } from './Members';
import { TrainngList } from './TrainingList';

// Routing components 

import { 
    BrowserRouter as Router, 
    Switch, 
    Route } from 'react-router-dom';


export default class InternalComponent extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <NavBar title="Lista Treninga" />
                    <Switch>
                        <Route exact path='/trainings/list' children={<TrainngList />}/>
                        <Route exact path='/members' children={<Members />}/>
                    </Switch>
                </Router>
            </div>
        )
    }

}

