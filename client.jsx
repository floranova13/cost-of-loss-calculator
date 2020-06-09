import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import X from './pages/X'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' components={X} />
    </Switch>
  </BrowserRouter>
  document.getElementById('root'),
)
