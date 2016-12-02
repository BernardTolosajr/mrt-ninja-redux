import { cancel, take, call, fork, put, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { firebaseDb } from '../firebase'
import { list } from '../firebase/list'
import * as api from '../services/api'
import { error } from '../actions'
import { bound } from '../utils'
import {
  getSelectedIncident,
  getSelectedBound,
  getSelectedStation
} from '../reducers'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function subscribe() {
    return eventChannel(emit => list.subscribe(emit));
}

function* update(context, apiFn, onError, payload, action) {
  try {
    const response = yield call(apiFn, payload)
    if (response === 'OK') {
      yield put(action)
    }
  }
  catch (error) {
    yield put(onError(error));
  }
}

const updateStatus = update.bind(null, list, api.updateStatus, error)
const refreshStatus = update.bind(null, list, api.refresh, error)

function* report() {
  const incident = yield select(getSelectedIncident)
  const bound = yield select(getSelectedBound);
  const station = yield select(getSelectedStation)

  yield call(updateStatus, {
    incident,
    bound,
    station
  }, {type: 'REPORT_INCIDENT_SUCCESS'})
}

export function* refreshData() {
  try {
    yield call(delay, 300000)
    yield call(refreshStatus, null, {type: 'REFRESH_STATION_SUCCESS'})
  } catch (error) {
    console.log('error on pooling', error)
    return
  }
}

function* watchRefreshData() {
  while(true) {
    yield fork(refreshData)

    yield take('REFRESH_STATION_SUCCESS')

    console.log('refreshed')

    yield call(refreshData)
  }
}

function* watchForReportIncident() {
  while(true) {
    const action = yield take('REPORT_INCIDENT')
    yield call(report)
  }
}

function* loadStations(name) {
  if (name === 'South') {
    yield put({type: 'LOAD_STATIONS', stations: bound.south})
  } else {
    yield put({type: 'LOAD_STATIONS', stations: bound.north})
  }
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchForSelectBound() {
  while(true) {
    const action = yield take('SELECT_BOUND')

    list.path = action.name
    yield fork(read)

    yield fork(loadStations, action.name)
  }
}

export default function* root() {
  yield [
    fork(watchForSelectBound),
    fork(watchForReportIncident),
    fork(watchRefreshData)
  ]
}
