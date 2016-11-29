import React from 'react'

const Stations = ({stations, children}) => {
  return (
        <ul className="collection">
          {stations.map((station, index) => (
            <li className="collection-item avatar" key={index}>
              <i className="material-icons circle green"></i>
              <span className="title">{station.name}</span>
              <p>Delayed <br />
                 Crowded
                 Crowded
               </p>
                { children }
              </li>
            ))}
        </ul>
  )
}

export default Stations
