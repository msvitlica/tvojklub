import React from 'react';
import {
  Typography, CardContent, List, ListItem, ListSubheader,
  ListItemText, ListItemSecondaryAction, Card, TextField,
  Divider, Grid, Button, ButtonGroup,
} from '@material-ui/core';
import CostumList from './CostumList'
export default class TrainingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingInfo: undefined,
      membersInGroup:[],
      processedMembers: [],

    }
  }
  componentDidMount = () => {
    const { match: { params } } = this.props;
    fetch(`http://localhost:3001/trainings/${params.trainingId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          trainingInfo: data.trainingId,
          membersInGroup:data.trainingId.membersInGroup,
        })
        console.log(this.state.membersInGroup)
      });
  }
  attend = (id) => {
    const deletedMember = this.state.membersInGroup.filter((el) => el.id === id);
    const movedMember = {
      attended: 'Prisutan/na',
      name: deletedMember[0].name,
      id: deletedMember[0].id,
      date: new Date(),
    }
    this.setState({ processedMembers: [movedMember, ...this.state.processedMembers],
      membersInGroup: this.state.membersInGroup.filter(el => el.id !== id),
    },
     ()=>{console.log(this.state.processedMembers)});
  }

  notAttend=(id)=> {
      const deletedMember = this.state.membersInGroup.filter((el) => el.id === id);
      const movedMember = {
        attended: 'Nije prisutan/na',
        name: deletedMember[0].name,
        id: deletedMember[0].id,
        date: new Date(),
      }
      this.setState({ processedMembers: [movedMember, ...this.state.processedMembers],
        membersInGroup: this.state.membersInGroup.filter(el => el.id !== id),},
        ()=>{ console.log(this.state.processedMembers)})
    }
  render() {
    if (!this.state.trainingInfo) {
      return null;
    }
    return (
      <React.Fragment>
        <Card >
          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography color="textPrimary" variant='h6'>
                  {this.state.trainingInfo.term}({this.state.trainingInfo.group})</Typography>
              </Grid>
              <Grid item xs={12} sm={4} className='trainingSearchBar'>
                <TextField id="outlined-basic"
                  label="Search" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <List subheader={<ListSubheader color='primary' >{this.state.trainingInfo.group}
        </ListSubheader>}>
          {this.state.membersInGroup.map((el) => (
            <ListItem key={el.id}>
              <ListItemText primary={el.name} />
              <ListItemSecondaryAction>
                <ButtonGroup variant="contained" >
                  <Button className='attendanceBtnY' onClick={() => this.attend(el.id)}>Da</Button>
                  <Button className='attendanceBtnN' onClick={() => this.notAttend(el.id)}>Ne</Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <CostumList processedMembers={this.state.processedMembers}></CostumList>
      </React.Fragment >
    )
  }
}
