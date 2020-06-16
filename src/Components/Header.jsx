import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import logo from '../logo.svg'
import categories from '../Static/Categories.json'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Header() {

  const firstCategories = categories.slice(0, 5)
  const otherCategories = categories.slice(5)

  const history = useHistory()

  const account = useSelector(state => state.Account)

  const [initialRoute, setInitialRoute] = useState(history.location.pathname)
  const [inSearch, setInSearch] = useState(false)

  const handleSearchChange = (e) => {
    if (e.target.value.length > 0) {
      if (!inSearch) {
        setInSearch(true)
        setInitialRoute(history.location.pathname)
      }
      history.push(`/pesquisa/${e.target.value}`)
    } else {
      setInSearch(false)
      history.push(initialRoute)
    }
  }

  useEffect(() => {
    console.log(account)
  }, [account])

  return (
    <div className='header-wrapper'>
      <header className='header'>
        <div className='container'>
          <div className='header-content'>
            <div>
              <Link to='/'>
                <img src={logo} className='header-logo' alt='logo' />
                <h1 className='brand-name'>
                  Zé Market
                </h1>
              </Link>
            </div>
            <div>
              <input onChange={handleSearchChange} className='search' type='text' placeholder='Pesquise a sua próxima compra aqui...' name='search'/>
            </div>
            <div className='account-actions'>
              <h5 className='my-account-link'>
                <Link to='/carrinho'>
                  Carrinho
                </Link>
              </h5>
              <h5 className='my-account-link'>
                {account.logged ? (
                  <Link to='/minha-conta'>
                    Olá, {account.nome.split(' ')[0]}
                  </Link>
                ) : (
                  <Link to='/login'>
                    Login
                  </Link>
                )}
              </h5>
            </div>
          </div>
        </div>
      </header>
      <header className='categories'>
        <div className='container'>
          <div className='categories-header'>Categorias</div>
          {firstCategories.map(category => (
            <li className='category' key={category.id}>
              <Link to={`/categoria/${category.id}`}>{category.nome}</Link>
            </li>
          ))}
          <li className='category dropdown'>
            <a href="#">Ver mais +</a>
            <ul className="submenu">
              {otherCategories.map(category => (
                <li href={`/categoria/${category.id}`} className='category' key={category.id}>
                  <Link to={`/categoria/${category.id}`}>{category.nome}</Link>
                </li>
              ))}
            </ul>
          </li>
        </div>
      </header>
    </div>
  )
}

export default Header