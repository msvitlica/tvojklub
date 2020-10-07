import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
export default class TrainngList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingInfo:undefined
    };
  }
  continue = (id) => {
    fetch(`http://localhost:3001/trainings/`+ id)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({ trainingInfo: data.trainingInfo })
    });
    this.props.nextStep();
  }
  render() {
    return (
      <div>
        <Card>
          {this.props.trainings.map((el) => (
            <CardActionArea key={el.id} onClick={() => this.continue(el.id)} >
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