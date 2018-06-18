import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Map as map } from 'immutable'
import reducer from '../reducers/index'
import Home from '../pages/containers/home'
import data from '../schemas/index'

const store = createStore(
  reducer,
  map({}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store.getState())

const homeContainer = document.getElementById('home-container')


render(
  <Provider store={store}>
    <Home />
  </Provider>
  , homeContainer
)