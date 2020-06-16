import React from 'react'
import Product from '../Components/Product'

import { useSelector } from 'react-redux'

function HomePage() {

  const products = useSelector(state => state.Products)

  return (
    <div>
      <h2 className='homepage-title'>Produtos recomendados</h2>
      <div className='product-grid'>
        {products.map(product => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default HomePage