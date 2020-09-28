import React from 'react';
import {Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
export class TrainngList extends React.Component{

    constructor(props) {
        super(props);
     
        this.state = {
          trainings: [],
        };
      }
     
      componentDidMount() {
        fetch('http://localhost:3001/trainings/trainings')
          .then(response => response.json())
          .then(data => {
              console.log(data);
               this.setState({ trainings: data.trainings });
            });
      }

      render(){
          return (
            <div>
                    <Card>
                            {this.state.trainings.map(el=>(
                              <CardActionArea key={el.id}>
                                <CardContent >
                                    <Typography style={{ float: "left" }} color="textPrimary" gutterBottom> {el.term}
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