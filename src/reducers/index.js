import { combineReducers } from 'redux'

const updateStatus = (state, snapshot) => {
  return state.map((station) => {
    if (station.name === snapshot.station) {
      station.status = snapshot.status
    }
    return station
  })
}

const stations = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_STATIONS':
      return action.stations
    case 'FIREBASE_CHILD_ADDED':
      return updateStatus(state, action.snapshot)
    default:
      return state
  }
}

const incident = (state = {}, action) => {
  switch(action.type) {
    case 'REPORT_INCIDENT':
      let { payload } = action
      return { payload, created: false }
    case 'REPORT_INCIDENT_SUCCESS':
      return { ...state, created: true }
    default:
      return state;
  }
}

const selectedIncident = (state = 'Crowded', action) => {
  switch(action.type) {
    case 'SELECTED_INCIDENT':
      return action.incident
    default:
      return state
  }
}

const selectedStation = (state = '', action) => {
  switch(action.type) {
    case 'SELECT_STATION':
      return action.name
    default:
      return state
  }
}

const selectedBound = (state = 'South', action) => {
  switch(action.type) {
    case 'SELECT_BOUND':
      return action.name
    default:
      return state
  }
}

const rootReducer = combineReducers({
  stations,
  selectedIncident,
  incident,
  selectedBound,
  selectedStation
})

export default rootReducer

export const getSelectedIncident = (state) => {
  return state.selectedIncident
}

export const getSelectedStation = (state) => {
  return state.selectedStation
}

export const getSelectedBound = (state) => {
  return state.selectedBound
}
