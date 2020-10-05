import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
export default class TrainngList extends React.Component {
 continue =()=>{
   this.props.nextStep();
 } 
  render() {
    return (
      <div>
        <Card>
          {this.props.trainings.map((el, index) => (
            <CardActionArea key={index} onClick={this.continue} >
              <CardContent>
                <Typography style={{ float: "left" }} color="textPrimary" gutterBottom> {el.term}{el.group}
                </Typography>
                <br></br>
                <Typography style={{ float: "left" }} variant='caption'> {el.groups}
                </Typography>
                <Typography style={{ float: "right" }} color="textPrimary">
                  {el.coach}
                </Typography>
              </CardContent>
            </CardActionArea>
          ))}
        </Card>
      </div>
    )
  }

}