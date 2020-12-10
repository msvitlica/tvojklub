import React from 'react';
import {Link,} from 'react-router-dom';
import GroupList from './GroupList';

// MUI components 

import {
    Button
} from '@material-ui/core';

export default function Group(props) {
    return (
        <div>
            <div>
                <Link to='/groups/new'>
                    <Button variant="contained">Nova Grupa</Button>
                </Link>
                <GroupList />
            </div>
        </div>
    )
}


