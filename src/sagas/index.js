import { take, call, fork, put, select } from 'redux-saga/effects'
import { getSelectedIncident } from '../reducers'

let list = [{
    name: 'Nort Avenue'
  }, {
    name: 'Quezon Avenue'
  }, {
    name: 'Cubao'
  }, {
    name: 'Santola,'
  }, {
    name: 'Ortigas'
  }, {
    name: 'Shaw Boulevard'
  }, {
    name: 'Boni Avenue'
  }, {
    name: 'Guadalupe'
  }, {
    name: 'Buendia'
  }, {
    name: 'Ayala'
  }, {
    name: 'Magallanes'
  }, {
    name: 'Taft Avenue'
  }]


function *delay(time) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

export function * report() {
  const incident = yield select(getSelectedIncident)
  console.log('incident', incident)
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
  yield delay(2000)
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
