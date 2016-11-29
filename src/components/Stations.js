import React from 'react'
import Incidents from './Incidents'

const Stations = ({stations, onStationClick}) => {
  return (
        <ul className="collection">
          {stations.map((station, index) => (
            <li className="collection-item avatar" key={index}>
              <i className="material-icons circle green"></i>
              <span className="title">{station.name}</span>
                <Incidents incidents={station.incidents}/>
                <a className="secondary-content btn-floating btn"
                  onClick={e => onStationClick(e, station.name) }>
                  <i className="material-icons">add</i>
                </a>
              </li>
            ))}
        </ul>
  )
}

export default Stations
