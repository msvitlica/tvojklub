import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import ScheduleBar from './ScheduleBar';
export default class TrainingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trainings: [],
      tabValue: 1,
    };
  }
  componentDidMount = () => {
    let date = new Date();
    date.setDate(date.getDate());
    const formattedDate = format(date, "yyyy-MM-dd");
    fetch(`http://localhost:3001/trainings?date=${formattedDate}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ trainings: data.training });
      });
  }
  handleClick = (id) => {
    const { match: { params }, history } = this.props;
    history.push(`trainings/${id}`);
  }
  getTrainingByDate = (date) => {
    fetch(`http://localhost:3001/trainings?date=${date}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ trainings: data.training },
          () => { console.log(this.state.trainings) })
      })
  }
  render() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ScheduleBar tabValue={this.state.tabValue}
            getTrainingBydate={this.getTrainingByDate}
          />
          <Card>
            {this.state.trainings.map((el) => (
              <CardActionArea key={el.id} onClick={() => this.handleClick(el.id)} >
                <CardContent>
                  <Typography> {el.term}{el.group}
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
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}