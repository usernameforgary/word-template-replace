import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'

import fileReducer from '../reducers/file'
import tagReducer from '../reducers/tag' 
import templateReducer from '../reducers/template'
import sideBarReducer from '../reducers/side-bar'
import exportReducer from '../reducers/export'

const history = createBrowserHistory()

const rootReducer = combineReducers({
  sideBar: sideBarReducer,
  files: fileReducer,
  tags: tagReducer,
  templates: templateReducer,
  export: exportReducer
})

const store = createStore(
  connectRouter(history)(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
    )
  )
)

export { 
  store as default,
  history
}