'use client'
import { recoverCustomer } from 'lib/shopify'
import { useState } from 'react'

export default function RecoverCard() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await recoverCustomer({email})
    if (typeof res === 'string') {
      setError(res)
    }
  }

  return (
    <form
      onSubmit={handleRecover}
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
            value={email}
            id='email'
            className='input input-primary'
            type='text'
            placeholder='Email Address' />
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
      {
        error ? (
          <div>{error}</div>
        ) :
          null
      }
  </form>
  )
}
