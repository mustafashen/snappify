'use client'
import React, { FormEvent, useState } from 'react'
import { customerRegister } from './actions'

export default function RegisterCard() {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [error, setError] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const res = await customerRegister(registerData)

    if (typeof res === 'string') {
      setError(res)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value })
  }

  return (
    <form
      onSubmit={handleLogin}
      className='card'>
      <div className='card-body'>
        <h2 className='card-title'>Register</h2>
        <p>Create a new account</p>
        <div>
          <label
            htmlFor='email'>
          </label>
          <input
            onInput={handleChange}
            value={registerData.email}
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
            value={registerData.password}
            id='password'
            className='input input-primary'
            type='password'
            placeholder='Password' />
        </div>
        <div>
          <label
            htmlFor='firstName'>
          </label>
          <input
            onInput={handleChange}
            value={registerData.firstName}
            id='firstName'
            className='input input-primary'
            type='text'
            placeholder='First name' />
        </div>
        <div>
          <label
            htmlFor='lastName'>
          </label>
          <input
            onInput={handleChange}
            value={registerData.lastName}
            id='lastName'
            className='input input-primary'
            type='text'
            placeholder='Last name' />
        </div>
        <div
          className='card-actions'>
          <button
            className='btn'
            type='submit'>
            Create Account
          </button>
        </div>
        {
          error ? (
            <div>{error}</div>
          ) :
            null
        }
      </div>
    </form>
  )
}
