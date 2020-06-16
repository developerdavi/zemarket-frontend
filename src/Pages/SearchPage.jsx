import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import _products from '../Static/Products.json'
import Product from '../Components/Product'

function SearchPage() {

  const params = useParams()

  const { query }  = params

  const [products, setProducts] = useState([])

  useEffect(() => {

    const results = _products.filter(x => x.nome.toLowerCase().includes(query.toLowerCase()))

    setProducts(results)

  }, [query])

  return (
    <div>
      <div className='breadcrumb'>
        <span><Link to='/'>Home</Link></span> /
        <span>Resultados da pesquisa por {query}</span>
      </div>

      <h2>{}</h2>
      <div className='product-grid'>
        {products && products.map(product => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage