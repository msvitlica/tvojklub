import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export default class TrainingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trainings: []            
    };
  }
  componentDidMount = () => {
    fetch('http://localhost:3001/trainings/list')
      .then(response => response.json())
      .then(data => {
        console.log(data.trainings)
        this.setState({ trainings: data.trainings });
      });
  }

  handleClick = (id) => {
    const { match: { params }, history } = this.props;
    history.push(`${id}`);
  }
  render() {
    return (
      <div>
        <Card>
          {this.state.trainings.map((el) => (
            <CardActionArea key={el.id} onClick={() => this.handleClick(el.id)} >
              <CardContent>
                <Typography gutterBottom> {el.term}{el.group}
                </Typography>
                <br></br>
                <Typography variant='caption'> {el.groups}
                </Typography>
                <Typography>
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