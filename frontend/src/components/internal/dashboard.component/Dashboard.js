import React from 'react'

const Dashboard = props => {
  
  return (
    <div>
      <h1>This is my dashboard</h1>
      <h2>Naziv kluba: {props.user.club || 'moraš unijeti naziv kluba'}</h2>
      <h3>Coaches:</h3>
    </div>
  )
}

export default Dashboard
