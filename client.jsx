import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import X from './pages/X'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' components={X} />
      <Route exact path='/2' components={Xtwo} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
  document.getElementById('root'),
)
