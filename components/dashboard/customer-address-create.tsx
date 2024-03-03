import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { addressCreate } from './actions'

export default function CustomerAddressCreate() {
  const [isOpen, setIsOpen] = useState(false)

  const [newAddress, setNewAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    zip: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await addressCreate({address: newAddress})
    console.log(res)
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className='btn btn-primary w-full'>
          Create Address
        </button>
      </div>
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}>
        <div className='fixed top-0 w-full h-full flex justify-center items-center'>
          <Dialog.Panel className='card bg-base-200 w-1/3'>
            <div className='card-body'>
              <Dialog.Title className='card-title'>Create New Address</Dialog.Title>
              <form action={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='firstName' 
                    className='label'>First name</label>
                  <input
                    onChange={handleChange}
                    id='firstName' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='lastName' 
                    className='label'>Last name</label>
                  <input
                    onChange={handleChange}
                    id='lastName' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='phone' 
                    className='label'>Phone</label>
                  <input
                    onChange={handleChange}
                    id='phone' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='country' 
                    className='label'>Country</label>
                  <input
                    onChange={handleChange}
                    id='country' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='city' 
                    className='label'>City</label>
                  <input
                    onChange={handleChange}
                    id='city' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='province' 
                    className='label'>Province</label>
                  <input
                    onChange={handleChange}
                    id='province' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='zip' 
                    className='label'>Zip Code</label>
                  <input
                    onChange={handleChange}
                    id='zip' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='address1' 
                    className='label'>Address 1</label>
                  <input
                    onChange={handleChange}
                    id='address1' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='address2' 
                    className='label'>Address 2</label>
                  <input
                    onChange={handleChange}
                    id='address2' 
                    className='input input-bordered'/>
                </div>
                <div className='grid grid-cols-2'>
                  <label
                    htmlFor='company' 
                    className='label'>Company</label>
                  <input
                    onChange={handleChange}
                    id='company' 
                    className='input input-bordered'/>
                </div>
                <div className='card-actions'>
                  <button 
                    className='btn btn-primary' 
                    type='submit'>
                    Create Address
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
    </>
  )

}