import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

Number.prototype.toCurrencyString = function () {
  return this.toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\.)/g, '$&.')
}

String.prototype.toCurrencyString = function () {
  return Number.parseFloat(this).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\.)/g, '$&.')
}

function Product(props) {

  const { data } = props

  return (
    <div className='product-card'>
      <Link to={`/produto/${data.id}`}>
        <div className='product-image'><img src={data.img || 'https://ec.europa.eu/consumers/consumers_safety/safety_products/rapex/alerts//assets/images/NoPicAvailable.png'} alt='Produto'/></div>
        <div className='product-title'>{data.nome}</div>
        <div className='product-price'>R$ {data.precoVenda.toCurrencyString()}</div>
        <div className='product-installments'>ou 3x de R$ {(data.precoVenda/3).toCurrencyString()}</div>
      </Link>
    </div>
  )
}

Product.propTypes = {
  data: PropTypes.object.isRequired
}

export default Product