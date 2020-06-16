import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

Number.prototype.toCurrencyString = function () {
  return this.toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\.)/g, '$&.')
}

String.prototype.toCurrencyString = function () {
  return Number.parseFloat(this).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\.)/g, '$&.')
}

function CartPage() {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.Cart)

  const handleRemoveItem = (id) => {
    dispatch({ type: 'remove_product_from_cart', id })
  }

  return (
    <div>
      <h2 className='homepage-title'>Carrinho</h2>
      <div>
        <table className='cart-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><Link to={`/produto/${product.id}`}>{product.nome}</Link></td>
                <td>R$ {product.precoVenda.toCurrencyString()}</td>
                <td><button onClick={() => handleRemoveItem(product.id)} className='red'>Remover item</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
    </div>
  )
}

export default CartPage