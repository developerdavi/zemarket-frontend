import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import _products from '../Static/Products.json'
import categories from '../Static/Categories.json'
import Product from '../Components/Product'

function CategoryPage() {

  const params = useParams()

  const { id }  = params

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState({ id: 0, nome: '' })

  useEffect(() => {
    const category = categories.find(x => x.id == id)
    
    if (category) {
      setCategory(category)

      const products = _products.filter(x => x.categoria == category.id)

      if (products) {
        setProducts(products)
      }
    }
  }, [id])

  return (
    <div>
      <div className='breadcrumb'>
        <span><Link to='/'>Home</Link></span> /
        <span>{category.nome}</span>
      </div>

      <h2>{category.nome}</h2>
      <div className='product-grid'>
        {products && products.map(product => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage