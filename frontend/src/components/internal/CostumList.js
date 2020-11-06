import React from 'react'
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@material-ui/core';
export class CostumList extends React.Component {
    render() {
        return (
            <div>
                <List subheader={<ListSubheader color='primary'>{'Processed Members'}
                </ListSubheader>}>
                    {this.props.processedMembers.reverse().map((el) => (
                        <ListItem key={el.id}>
                            <ListItemText primary={el.name}
                            />
                            <Typography>{el.attended}</Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default CostumList
