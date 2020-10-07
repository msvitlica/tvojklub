import React from 'react';
import { Typography, CardContent, FormGroup, FormControl, FormControlLabel, FormLabel, Card, TextField, Switch } from '@material-ui/core';
export default class TrainingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingInfo: undefined,
    };
  } 
// pass an object trainingInfo as props from TrainingList component
//and render 

  render() {
    if (!this.props.trainingInfo) {
      return null;
    } 
    return (
      <React.Fragment>
        <Card >
          <CardContent>
            <Typography style={{ float: 'left' }} color="textPrimary" variant='h6'>
              {this.props.trainingInfo.term}({this.props.trainingInfo.group})</Typography>
          </CardContent>
          <TextField style={{ float: 'right' }} id="outlined-basic"
            label="Search" variant="filled" />
        </Card>
        <FormControl style={{ float: 'left' }}  >
          <FormLabel color='primary'>{this.props.trainingInfo.group}</FormLabel>
          {this.props.trainingInfo.membersInGroup.map((el, index) => (
            <FormControl key={index} style={{ float: 'left' }}  >
              <FormGroup>
                <FormControlLabel
                  label={el}
                  labelPlacement="start"
                  control={<Switch />}
                />
              </FormGroup>
            </FormControl>
          ))}
        </FormControl>
      </React.Fragment>
    )
  }
}
