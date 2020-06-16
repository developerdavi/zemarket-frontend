import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import api from '../Services/Api'
import { useDispatch } from 'react-redux'

function LoginPage() {

  const dispatch = useDispatch()

  const [enabled, setEnabled] = useState(false)

  const [loginData, setLoginData] = useState({ })
  const [signupData, setSignupData] = useState({ 
    rua: 'Por favor, preencha o CEP!',
    bairro: 'Por favor, preencha o CEP!',
    cidade: 'Por favor, preencha o CEP!'
  })

  const handleLoginChange = (e) => {
    const data = loginData
    data[e.target.name] = e.target.value
    setLoginData(data)
  }

  const handleCepDataFetching = async (cep) => {
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)

    if (response) {
      const data = { ...signupData }
      data['rua'] = response.data.street
      data['bairro'] = response.data.neighborhood
      data['cidade'] = response.data.city

      if (data['bairro'] !== 'Salgado Filho') {
        setEnabled(false)
        alert('Infelizmente, esse bairro não é atendido pelo nosso estabelecimento')
      } else {
        setEnabled(true)
      }

      setSignupData(data)
    }
  }

  const handleSignupChange = async (e) => {
    const data = { ...signupData }

    if (e.target.name === 'cep') {
      if (e.target.value.length === 8) {
        handleCepDataFetching(e.target.value)
      } else {
        data.rua = 'Por favor, preencha o CEP!'
        data.bairro = 'Por favor, preencha o CEP!'
        data.cidade = 'Por favor, preencha o CEP!'
      }
    }

    data[e.target.name] = e.target.value
    setSignupData(data)
  }

  const handleSignupSubmit = async () => {
    const data = { ...signupData }

    const response = await api.post('/clientes', data)

    if (response.status === 201) {
      alert('Cliente cadastrado com sucesso')
    }
  }

  const handleLoginSubmit = async () => {
    const data = { ...loginData }

    const response = await api.get('/clientes')

    if (response.status === 200) {
      const found = response.data.find(x => x.email === data.email)
      if (found) {
        alert('Logado com sucesso')

        dispatch({ type: 'change_account_data', Account: { logged: true, ...found } })
      } else {
        alert('Dados inválidos')
      }
    }
  }

  return (
    <div>
      <div className='breadcrumb'>
        <span><Link to='/'>Home</Link></span> /
        <span>Minha conta</span>
      </div>

      <div className='login-grid'>
        <div className='card'>
          <h1>Já sou cadastrado</h1>

          <h4>E-mail</h4>
          <input onChange={handleLoginChange} type='email' name='email'/>
          <h4>Senha</h4>
          <input onChange={handleLoginChange} type='password' name='senha'/>

          <button onClick={handleLoginSubmit} className='btn'>Entrar</button>
        </div>
        <div className='card'>
          <h1>Não tenho conta</h1>

          <h4>Nome completo</h4>
          <input onChange={handleSignupChange} type='text' name='nome'/>
          <h4>CPF</h4>
          <input onChange={handleSignupChange} type='text' name='cpf'/>
          <h4>Nascimento</h4>
          <input onChange={handleSignupChange} type='date' name='nascimento'/>
          <h4>E-mail</h4>
          <input onChange={handleSignupChange} type='email' name='email'/>
          <h4>Senha</h4>
          <input onChange={handleSignupChange} type='password' name='senha'/>
          <h4>CEP</h4>
          <input onChange={handleSignupChange} type='text' name='cep'/>
          <h4>Rua</h4>
          <input value={signupData.rua} disabled onChange={handleSignupChange} type='text' name='rua'/>
          <h4>Bairro</h4>
          <input value={signupData.bairro} disabled onChange={handleSignupChange} type='text' name='bairro'/>
          <h4>Cidade</h4>
          <input value={signupData.cidade} disabled onChange={handleSignupChange} type='text' name='cidade'/>
          <h4>Número</h4>
          <input onChange={handleSignupChange} type='text' name='numero'/>
          <h4>Complemento</h4>
          <input onChange={handleSignupChange} type='text' name='complemento'/>

          <button disabled={!enabled} onClick={handleSignupSubmit} className='btn'>Cadastrar</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage