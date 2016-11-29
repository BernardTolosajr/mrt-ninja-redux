const LOAD_STATIONS = 'LOAD_STATIONS'

export const loadStations = () => ({
    type: LOAD_STATIONS
})

export const selectIncident = (incident) => ({
  type: 'SELECTED_INCIDENT',
  incident
})

export const reportIncident = (payload) => ({
  type: 'REPORT_INCIDENT',
  payload
})

export const selectBound = (name) => ({
  type: 'SELECT_BOUND',
  name
})

export const selectStation = (name) => ({
  type: 'SELECT_STATION',
  name
})
