import { Dialog } from '@headlessui/react'
import { CustomerAddress } from 'lib/shopify/types'
import React, { useState } from 'react'
import { addressUpdate, addressUpdateDefault } from './actions'

export default function CustomerAddressUpdate({address}: {address: CustomerAddress}) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const [newAddress, setNewAddress] = useState({
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    company: address.company,
    country: address.country,
    firstName: address.firstName,
    lastName: address.lastName,
    phone: address.phone,
    province: address.province,
    zip: address.zip
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await addressUpdate({id: address.id as string, address: newAddress})
    if ('Error' in res) {
      setMessage(res.Error.message)
    }
    setIsOpen(false)
  }

  const handleSetDefault = async () => {
    const res = await addressUpdateDefault({id: address.id as string})
    if ('Error' in res) {
      setMessage(res.Error.message)
    }
  }

  return (
    <>
      <button 
        className='btn'
        onClick={() => setIsOpen(true)}
        >
        Edit
      </button>
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        className='card bg-base-100'>
        <div className='fixed top-0 w-full h-full flex justify-center items-center'>
          <Dialog.Panel className='card bg-base-200 w-[600px] animate-fade-up'>
            <div className='card-body'>
              <Dialog.Title className='card-title'>Update Address</Dialog.Title>
              <form action={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='firstName' 
                    className='label'>First name</label>
                  <input
                    onChange={handleChange}
                    id='firstName' 
                    className='input input-primary input-bordered'
                    value={newAddress.firstName}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='lastName' 
                    className='label'>Last name</label>
                  <input
                    onChange={handleChange}
                    id='lastName' 
                    className='input input-primary input-bordered'
                    value={newAddress.lastName}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='phone' 
                    className='label'>Phone</label>
                  <input
                    onChange={handleChange}
                    id='phone' 
                    className='input input-primary input-bordered'
                    value={newAddress.phone}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='country' 
                    className='label'>Country</label>
                  <input
                    onChange={handleChange}
                    id='country' 
                    className='input input-primary input-bordered'
                    value={newAddress.country}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='city' 
                    className='label'>City</label>
                  <input
                    onChange={handleChange}
                    id='city' 
                    className='input input-primary input-bordered'
                    value={newAddress.city}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='province' 
                    className='label'>Province</label>
                  <input
                    onChange={handleChange}
                    id='province' 
                    className='input input-primary input-bordered'
                    value={newAddress.province}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='zip' 
                    className='label'>Zip Code</label>
                  <input
                    onChange={handleChange}
                    id='zip' 
                    className='input input-primary input-bordered'
                    value={newAddress.zip}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='address1' 
                    className='label'>Address 1</label>
                  <input
                    onChange={handleChange}
                    id='address1' 
                    className='input input-primary input-bordered'
                    value={newAddress.address1}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='address2' 
                    className='label'>Address 2</label>
                  <input
                    onChange={handleChange}
                    id='address2' 
                    className='input input-primary input-bordered'
                    value={newAddress.address2}/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='company' 
                    className='label'>Company</label>
                  <input
                    onChange={handleChange}
                    id='company' 
                    className='input input-primary input-bordered'
                    value={newAddress.company}/>
                </div>
                <div className='card-actions'>
                  <button 
                    className='btn btn-primary' 
                    type='submit'>
                    Update Address
                  </button>
                  <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleSetDefault}>
                    Set Default
                  </button>
                  <button 
                    className='btn btn-primary' 
                    onClick={() => setIsOpen(false)}
                    type='button'>
                      Cancel
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
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
