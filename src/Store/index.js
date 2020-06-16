import { combineReducers, createStore } from 'redux'
import Products from './Reducers/Products'
import Cart from './Reducers/Cart'
import Account from './Reducers/Account'

const reducer = combineReducers({ Products, Cart, Account })

export default createStore(reducer)