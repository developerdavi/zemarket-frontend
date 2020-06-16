import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import categories from '../Static/Categories.json'
import { useSelector } from 'react-redux'

Number.prototype.toCurrencyString = function () {
  return this.toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\.)/g, '$&.')
}

String.prototype.toCurrencyString = function () {
  return Number.parseFloat(this).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\.)/g, '$&.')
}

function ProductPage() {

  const params = useParams()

  const { id }  = params

  const [product, setProduct] = useState({ id, nome: '', precoVenda: 0, imagem: '', estoque: 1 })
  const [category, setCategory] = useState({ id: 0, nome: '' })

  const products = useSelector(state => state.Products)

  useEffect(() => {
    const product = products.find(x => x.id == id)
    
    if (product) {
      setProduct(product)

      const category = categories.find(x => x.id == product.categoria)

      if (category) {
        setCategory(category)
      }
    }
  }, [id, products])

  return (
    <div>
      <div className='breadcrumb'>
        <span><Link to='/'>Home</Link></span> /
        <span><Link to={`/categoria/${category.id}`}>{category.nome}</Link></span> /
        <span>{product.nome}</span>
      </div>

      <div className='product-page-grid'>
        <div className='product-image'>
          <img src={product.imagem} alt=''/>
        </div>
        <div className='product-content'>
          <h1 className='product-title'>{product.nome}</h1>
          <span>Ref.: #{product.id}</span>
          <h3 className='product-price'>R$ {product.precoVenda.toCurrencyString()}</h3>
          <h5 className='product-installments'>ou 3x de R$ {(product.precoVenda/3).toCurrencyString()}</h5>

          {product.estoque > 0 ? (
            <div>
              <input className='product-quantity' defaultValue={1} type='number' min={1} max={product.estoque}/>
              <button className='product-buy-btn'>Comprar</button>
            </div>
          ) : (
            <h3 className='product-no-stock'>Produto sem estoque!</h3>
          )}

        </div>
      </div>

      <div className='product-description'>
        <h2>Descrição do produto</h2>
        <p>{product.descricao}</p>
      </div>
    </div>
  )
}

export default ProductPage