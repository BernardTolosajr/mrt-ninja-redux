import { combineReducers } from 'redux'

const stations = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_STATIONS':
      return action.stations
    default:
      return state;
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
  selectedBound
})

export const getSelectedIncident = (state) => {
  return state.selectedIncident
}

export default rootReducer
