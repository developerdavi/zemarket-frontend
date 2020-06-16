import React from 'react'
import './App.css'
import Header from './Components/Header'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { useEffect } from 'react'
import api from './Services/Api'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()

  const setProducts = (products) => {
    dispatch({ type: 'change_product_data', Products: products })
  }

  const getProducts = async () => {
    const response = await api.get('/produtos')

    setProducts(response.data)
  }

  const setCategories = (categories) => {
    dispatch({ type: 'change_categories_data', Categories: categories })
  }

  const getCategories = async () => {
    const response = await api.get('/categorias')

    setCategories(response.data)
  }

  const getData = async () => {
    getProducts()
    getCategories()
  }

  useEffect(getData, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes/>
      </div>
    </BrowserRouter>
  )
}

export default App
