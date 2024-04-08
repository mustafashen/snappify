'use client'

import { CustomerAddress } from 'lib/shopify/types'
import CustomerAddressUpdate from './customer-address-update'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { addressDelete } from './actions'
import { useState } from 'react'

export default function CustomerAddressCard({address}: {address: CustomerAddress}) {
  const [message, setMessage] = useState('')
  const handleAddressDelete = async () => {
    const res = await addressDelete({id: address.id})
    if ('Error' in res) {
      //@ts-ignore
      setMessage(res.Error.message)
    }
  }

  return (
    <>
      <li 
        key={address.id}
        className="card card-bordered shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{address.city}/{address.country}</h2>
          <p>
            {address.firstName}, {address.lastName}
          </p>
          <p>
            {address.address1}
            <br/>
            {address.address2}
          </p>
          <div
            className='card-actions'>
            <CustomerAddressUpdate
              address={address}
              />
          </div>
        </div>
        <button
          onClick={() => handleAddressDelete()} 
          className='btn btn-ghost btn-circle absolute top-1 right-1'>
            <XMarkIcon className='w-5 h-5'/>
        </button>
      </li>
      {
        message ? (
          <div className="toast toast-center">
            <div className="alert alert-error">
              <span>{message}</span>
            </div>
          </div>
        ) : null
      }
    </>
  )
}
