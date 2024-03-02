import { Customer } from 'lib/shopify/types'
import React from 'react'
import { customerUpdate } from './actions'

export default function EditCard({customer}: {customer: Customer}) {
  
  const [customerData, setCustomerData] = React.useState({...customer, password: ''})
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'checkbox') {
        setCustomerData({ ...customerData, [event.target.id]: event.target.checked })
    } else if (event.target.type === 'text') {
        setCustomerData({ ...customerData, [event.target.id]: event.target.value })
    }
  }

  const handleCustomerUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    customerUpdate({updates: customerData})
  }

  return (
    <div className='card-body'>
      <form 
        onSubmit={handleCustomerUpdate}
        className='flex flex-col gap-4 *:flex *:flex-col *:gap-2'
        >
        <div>
          <label htmlFor='firstName'>First name:</label>
          <input
            className='input input-bordered'
            id='firstName' 
            type='text' 
            value={customerData.firstName ? customerData.firstName : ''}
            onChange={handleChange}
            placeholder='New name'/>
        </div>
        <div>
          <label htmlFor='lastName'>Last name:</label>
          <input
            className='input input-bordered'
            id='lastName' 
            type='text' 
            value={customerData.firstName ? customerData.lastName : ''}
            onChange={handleChange}
            placeholder='New last name'/>
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            className='input input-bordered'
            id='email' 
            type='text' 
            value={customerData.email ? customerData.email : ''}
            onChange={handleChange}
            placeholder='New email'/>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            className='input input-bordered'
            id='password' 
            type='text' 
            value={customerData.password ? customerData.password : ''}
            onChange={handleChange}
            placeholder='New password'/>
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            className='input input-bordered'
            id='phone' 
            type='text' 
            value={customerData.phone ? customerData.phone : ''}
            onChange={handleChange}
            placeholder='New phone number'/>
        </div>
        <div className='!flex-row'>
          <input
            className='checkbox checkbox-primary'
            id='acceptsMarketing' 
            type='checkbox'
            checked={customerData.acceptsMarketing ? customerData.acceptsMarketing : false}
            onChange={handleChange}/>
          <label htmlFor='acceptsMarketing'>Accept Marketing Emails</label>
        </div>
        <div className='card-actions'>
          <button 
            className='btn btn-primary'
            type='submit'>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}
