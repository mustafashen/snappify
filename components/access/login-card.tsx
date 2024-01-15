'use client'
import React, { FormEvent, useState } from 'react'

export default function LoginCard() {
  const [loginData, setLoginData]= useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
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
            htmlFor='login-email'>
          </label>
          <input
            onChange={handleChange}
            value={loginData.email}
            id='login-email'
            className='input input-primary'
            type='text'
            placeholder='Email Address' />
        </div>
        <div>
          <label
            htmlFor='login-email'>
          </label>
          <input
            onChange={handleChange}
            value={loginData.password}
            id='login-email'
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
          </button>
      </div>
    </form>
  )
}
