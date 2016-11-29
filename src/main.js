'use strict';
import "babel-polyfill";

import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

import React, { Component } from 'react'
import { render } from 'react-dom';
import Platform from './components/Platform'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Platform />
  </Provider>,
document.getElementById('app-root'))
