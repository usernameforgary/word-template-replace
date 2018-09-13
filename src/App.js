import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch} from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import store, {history} from './store/index'
import 'antd/dist/antd.css'

import Home from './components/home/Home'
import FileAdd from './components/files/file-add'
import FileList from './components/files/file-list'
import TemplateAdd from './components/templates/template-add'
import TemplateList from './components/templates/template-list'
import TagAdd from './components/tags/tag-add'
import TagList from './components/tags/tag-list'

import {
  ROUTER_URL_EXPORT,
  ROUTER_URL_FILE_LIST,
  ROUTER_URL_FILE_ADD,
  ROUTER_URL_TEMPLATE_LIST,
  ROUTER_URL_TEMPLATE_ADD,
  ROUTER_URL_TAG_LIST,
  ROUTER_URL_TAG_ADD,
} from './consts/side-bar'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Switch>
                <Route exact path='/' component={ Home }></Route>
                <Route path={ ROUTER_URL_FILE_ADD } component={ FileAdd }></Route>
                <Route path={ ROUTER_URL_FILE_LIST } component={ FileList }></Route>
                <Route path={ ROUTER_URL_TEMPLATE_ADD } component={ TemplateAdd }></Route>
                <Route path={ ROUTER_URL_TEMPLATE_LIST } component={ TemplateList }></Route>
                <Route path={ ROUTER_URL_TAG_ADD } component={ TagAdd }></Route>
                <Route path={ ROUTER_URL_TAG_LIST } component={ TagList }></Route>
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
