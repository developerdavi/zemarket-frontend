import { combineReducers, createStore } from 'redux'
import Products from './Reducers/Products'

const reducer = combineReducers({ Products })

export default createStore(reducer)