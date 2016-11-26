'use strict';
import "babel-polyfill";
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

import React, { Component } from 'react'
import { render } from 'react-dom';
import Gallery from './components/Gallery'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'

import { loadImages,  watchForLoadImages} from './sagas'

const store = createStore(
  reducer,
  applyMiddleware(createSagaMiddleware(watchForLoadImages))
)

export class Bar extends Component {
  render() {
    return(
      <a className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>button</a>
    )
  }
}

render(
  <Provider store={store}>
    <Bar />
  </Provider>,
document.getElementById('app-root'));
