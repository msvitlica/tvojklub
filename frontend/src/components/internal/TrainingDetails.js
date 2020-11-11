import React from 'react';
import {
  Typography, CardContent, List, ListItem, ListSubheader,
  ListItemText, ListItemSecondaryAction, Card, TextField,
  Divider, Grid, Button
} from '@material-ui/core';
import CostumList from './CostumList'
import AttendanceStatus from './AttendanceStatus';
export default class TrainingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingInfo: undefined,
      membersInGroup: [],
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
          membersInGroup: data.trainingId.membersInGroup,
        })
        console.log(this.state.membersInGroup)
      });
  }
  processMember = (id, attendance) => {
    const deletedMember = this.state.membersInGroup.filter((el) => el.id === id);
    const movedMember = {
      attendance: attendance === true ? 'Prisutan/na' : 'Nije prisutan/na',
      name: deletedMember[0].name,
      id: deletedMember[0].id,
      date: new Date(),
    }
    this.setState({
      processedMembers: [movedMember, ...this.state.processedMembers],
      membersInGroup: this.state.membersInGroup.filter(el => el.id !== id),
    },
      () => { console.log(this.state.processedMembers) });
  }
  submitGroup=(e)=>{
    e.preventDefault();
    this.postProcessedGroup();
  }
  postProcessedGroup= async ()=>{
    fetch('http://localhost:3001/processedGroups',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },body: JSON.stringify({processedMembers: this.state.processedMembers})  
});
  }
  render() {
    const attended = true;
    const notAttended = false;
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
        <form onSubmit={this.submitGroup}>
        <List subheader={<ListSubheader color='primary' >{this.state.trainingInfo.group}
        </ListSubheader>}>
          {this.state.membersInGroup.map((el) => (
            <ListItem key={el.id}>
              <ListItemText primary={el.name} />
              <ListItemSecondaryAction>
                <AttendanceStatus attended={attended} notAttended={notAttended} member={el} processMember={this.processMember} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <CostumList membersInGroup={this.state.processedMembers}></CostumList>
         <Button type='submit' variant='contained' color='primary'>Sačuvaj</Button>
        </form>
      </React.Fragment >
    )
  }
}
