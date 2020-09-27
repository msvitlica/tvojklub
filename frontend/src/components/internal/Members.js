import React from 'react';


export class Members extends React.Component{

    constructor(props) {
        super(props);
     
        this.state = {
          members: [],
        };
      }
     
      componentDidMount() {
        fetch('http://localhost:3001/members')
          .then(response => response.json())
          .then(data => {
              console.log(data);
               this.setState({ members: data.members });
            });
      }

      render(){
          return (<div>
              {this.state.members.map(t => (
                  <h5>{t.name}</h5>
              ))}
              </div>
          )
      }
  
}