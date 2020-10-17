import React from 'react';
import {
    CardActionArea,
    CardContent,
    Typography
} from '@material-ui/core';

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/groups')
            .then(response => response.json())
            .then(data => {
                this.setState({ groups: data.groups });
            });
    }
    render() {
        return (
            <div>
                {this.state.groups.map(group => (
                    <CardActionArea key={group.id}>
                        <CardContent>
                            <Typography>
                                Grupa: {group.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                ))}
            </div>
        )
    }
}

export default GroupList; 