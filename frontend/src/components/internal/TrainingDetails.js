import React from 'react';
import { Typography, CardContent, FormGroup, FormControl, FormControlLabel, FormLabel, Card, TextField, Switch, Grid } from '@material-ui/core';
export default class TrainingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingInfo: undefined
    }
  }
  componentDidMount = () => {
    const { match: { params } } = this.props;
    fetch(`http://localhost:3001/trainings/${params.trainingId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ trainingInfo: data.trainingId })
      });
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
        <FormControl className='root' >
          <Grid container className='trainingDetailsContainer'>
            < Grid item >
              <FormLabel className='trainingDetailsTitle' color='primary'>{this.state.trainingInfo.group}
              </FormLabel>
            </Grid>
            <Grid item className='trainingDetailsMembers'>
            {this.state.trainingInfo.membersInGroup.map((el, index) => (
              <FormControl key={index}  >
                <FormGroup>
                  <FormControlLabel
                    label={el}
                    labelPlacement="start"
                    control={<Switch />}
                  />
                </FormGroup>
              </FormControl>
            ))}
            </Grid>
          </Grid>
        </FormControl>
      </React.Fragment>
    )
  }
}
