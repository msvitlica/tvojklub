import React from 'react';
import { CardActionArea,CardContent,Typography } from '@material-ui/core';
    
export default class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        }
    }
    fetchData = async () => {
        let APIurl = 'http://localhost:3001/groups';
        const res = await fetch(APIurl)
        const data = await res.json();
        this.setState({ groups: data })
        console.log(this.state.groups);
    };
    componentDidMount = () => {
        this.fetchData()
    };
    render() {
        return (
            <div>
            {this.state.groups.map(group => (
                <CardActionArea key={group._id}>
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

