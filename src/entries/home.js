import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Map as map } from 'immutable'
import reducer from '../reducers/index'
import Home from '../pages/containers/home'

const logger = ({ getState, dispatch }) => next => action => {
  console.log('vamos a enviar esta accion', action)
  const value = next(action)
  console.log('este es mi nuevo estado', getState().toJS())
  return value
}

const store = createStore(
  reducer,
  map({}),
  applyMiddleware(logger)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store.getState())

const homeContainer = document.getElementById('home-container')


render(
  <Provider store={store}>
    <Home />
  </Provider>
  , homeContainer
)