import 'es5-shim'
import 'es5-shim/es5-sham'
import 'console-polyfill'
import 'es6-promise'
import 'fetch-ie8'
import 'html5shiv'

import 'babel-polyfill' //不加这句，后面类似Object.assign这种源生api都用不了，即使是在新版chrome下。。。
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
//import 'todomvc-app-css/index.css'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
