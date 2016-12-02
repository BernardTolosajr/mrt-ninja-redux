import React from 'react'
import Status from './Status'

const Stations = ({stations, onStationClick}) => {
  return (
        <ul className="collection">
          {stations.map((station, index) => (
            <li className="collection-item avatar" key={index}>
              <Status status={station.status}/>
              <span className="title">{station.name}</span>
                <span className="label">{station.status}</span>
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
