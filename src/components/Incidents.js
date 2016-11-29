import React from 'react'

const Incidents = ({incidents}) => {
  return (
        <div>
          {incidents.map((incident, index) => (
            <p key={index}>
            {incident} <br />
            </p>
          ))}
        </div>
  )
}

export default Incidents
