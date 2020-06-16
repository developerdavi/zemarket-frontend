import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'
import CategoryPage from './Pages/CategoryPage'
import SearchPage from './Pages/SearchPage'
import LoginPage from './Pages/LoginPage'

function Routes() {
  return (
    <Switch>
      <div className="container">
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/produto/:id' component={ProductPage} />
        <Route path='/categoria/:id' component={CategoryPage} />
        <Route path='/pesquisa/:query' component={SearchPage} />
      </div>
    </Switch>
  )
}

export default Routes