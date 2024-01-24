'use client'
import React, { FormEvent, useState } from 'react'
import { customerLogin } from './actions'

export default function LoginCard() {
  const [loginData, setLoginData]= useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    customerLogin({...loginData})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  return (
    <form
      onSubmit={handleLogin}
      className='card'>
      <div className='card-body'>
        <h2 className='card-title'>Login</h2>
        <p>Login to your account</p>
        <div>
          <label
            htmlFor='email'>
          </label>
          <input
            onInput={handleChange}
            value={loginData.email}
            id='email'
            className='input input-primary'
            type='text'
            placeholder='Email Address' />
        </div>
        <div>
          <label
            htmlFor='password'>
          </label>
          <input
            onInput={handleChange}
            value={loginData.password}
            id='password'
            className='input input-primary'
            type='password'
            placeholder='Password' />
        </div>
      </div>
      <div
        className='card-actions'>
          <button 
            className='btn'
            type='submit'>
              Login
          </button>
      </div>
    </form>
  )
}
