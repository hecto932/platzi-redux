import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers/data'
import Home from '../pages/containers/home'
import data from '../schemas/index'

const initialState = {
  data: {
    entities: data.entities,
    categories: data.result.categories
  },
  search: []
}

const store = createStore(
  reducer,
  initialState,
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