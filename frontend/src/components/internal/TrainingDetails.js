import React from 'react';
import { Typography, CardContent, FormGroup, FormControl, FormControlLabel, FormLabel, Card, TextField, Switch } from '@material-ui/core';
export default class TrainingDetails extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {     
      trainingInfo:undefined,  
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/trainings/'+this.props.trainingId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ trainingInfo: data.trainingInfo });
      });
  }

  render() {

    if(!this.state.trainingInfo){
      return null;
    }
    return (
      <React.Fragment>
        <Card>
          <CardContent >
            <Typography style={{ float: 'left' }} color="textPrimary" variant='h6'>
              {this.state.trainingInfo.term}({this.state.trainingInfo.group})</Typography>
          </CardContent>
          <TextField style={{ float: 'right' }} id="outlined-basic"
            label="Search" variant="filled" />
        </Card>
        <FormControl style={{ float: 'left' }}  >
          <FormLabel color='primary'>{this.state.trainingInfo.group}</FormLabel>
          <div>
            {this.state.trainingInfo.membersInGroup.map((el,index)=>(
             <FormControl key={index} style={{ float:'left' }}  >
             <FormGroup>
               <FormControlLabel
                label={el}
                labelPlacement="start"
                control={<Switch/>}
               />
               </FormGroup>
               </FormControl>               
            ))}
          </div>
        </FormControl>
      </React.Fragment>
    )
  }
}
