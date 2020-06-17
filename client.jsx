import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import MainPage from './pages/Main'
import FormAPage from './pages/FormA'
import FormBPage from './pages/FormB'
import FormCPage from './pages/FormC'
import SummaryPage from './pages/Summary'
import ErrorPage from './pages/Error'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/formA" component={FormAPage} />
      <Route exact path="/formB" component={FormBPage} />
      <Route exact path="/formC" component={FormCPage} />
      <Route exact path="/summary" component={SummaryPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
