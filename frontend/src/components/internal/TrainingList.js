import React from 'react';


export class TrainngList extends React.Component{

    constructor(props) {
        super(props);
     
        this.state = {
          trainings: [],
        };
      }
     
      componentDidMount() {
        fetch('http://localhost:3001/trainings/list')
          .then(response => response.json())
          .then(data => {
               this.setState({ trainings: data.trainings });
            });
      }

      render(){
          return (<div>
              {this.state.trainings.map(t => (
                  <h5>{t.term}</h5>
              ))}
              </div>
          )
      }
  
}