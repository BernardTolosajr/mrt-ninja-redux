import { take, call, fork, put, select } from 'redux-saga/effects'
import { getSelectedIncident, getSelectedBound } from '../reducers'

let list = [{
    name: 'Nort Avenue',
    incidents: ['Crowded', 'Delayed Train', 'Close']
  }, {
    name: 'Quezon Avenue',
    incidents: []
  }, {
    name: 'Cubao',
    incidents: []
  }, {
    name: 'Santola,',
    incidents: []
  }, {
    name: 'Ortigas',
    incidents: []
  }, {
    name: 'Shaw Boulevard',
    incidents: []
  }, {
    name: 'Boni Avenue',
    incidents: []
  }, {
    name: 'Guadalupe',
    incidents: []
  }, {
    name: 'Buendia',
    incidents: []
  }, {
    name: 'Ayala',
    incidents: []
  }, {
    name: 'Magallanes',
    incidents: []
  }, {
    name: 'Taft Avenue',
    incidents: []
  }]


function *delay(time) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

export function * report() {
  const incident = yield select(getSelectedIncident)
  const bound = yield select(getSelectedBound);
  console.log('reporting ', incident, bound)
  yield delay(2000)
  yield put({type: 'REPORT_INCIDENT_SUCCESS'})
}

export function* watchForReportIncident() {
  while(true) {
    const action = yield take('REPORT_INCIDENT')
    yield call(report)
  }
}

function* loadStations(name) {
  yield put({type: 'LOAD_STATIONS', stations: list})
}

export function* watchForSelectBound() {
  while(true) {
    const action = yield take('SELECT_BOUND')
    yield fork(loadStations, action.name)
  }
}

export default function* root() {
  yield [
    fork(watchForSelectBound),
    fork(watchForReportIncident)
  ]
}
