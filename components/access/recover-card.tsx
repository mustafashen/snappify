'use client'

import { ReactElement, useState } from 'react'
import { customerRecover } from './actions'

export default function RecoverCard({returnLogin}: {returnLogin: ReactElement}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await customerRecover({email})
    if (typeof res === 'string') {
      setError(res)
    }
  }

  return (
    <form
      onSubmit={handleRecover}
      className='card bg-base-100'>
      <div className='card-body px-0'>
        <h2 className='card-title'>Recover Account</h2>
        <p>Enter email address for password change</p>
        <div>
          <label
            className='hidden'
            htmlFor='email'>
            Email
          </label>
          <input
            onInput={handleChange}
            value={email}
            id='email'
            className='input input-primary'
            type='text'
            placeholder='Email Address' />
        </div>
        <div
          className='card-actions flex-nowrap flex-col'>
          <button
            className='btn btn-primary'
            type='submit'>
            Send
          </button>
          {
          error ? (
            <div>{error}</div>
          ) :
            null
          }
          {returnLogin}
        </div>
      </div>
  </form>
  )
}
