'use client'
import { Dialog } from '@headlessui/react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import WishlistLine from './wishlist-line'

export default function WishlistDrawer({wishlist}: {wishlist: string[]}) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
  <>
    <button 
        className='btn btn-ghost btn-square relative'
        type="button"
        onClick={openModal}>
          {
            wishlist && wishlist.length > 0 ? (
              <span className='absolute bottom-0 right-0 rounded-full bg-neutral flex justify-center items-center w-5 h-5'>{wishlist.length}</span>
            ) : null
          }
          <HeartIcon className='w-5 h-5'/>
    </button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel className='fixed top-0 right-0 h-full w-1/5 max-xl:w-1/2 max-md:w-full p-4 flex flex-col card card-bordered shadow-xl bg-base-200 z-10 animate-fade-left'>
        <div className='navbar justify-between mb-4'>
          <Dialog.Title className='text-2xl card-title'>
            Wishlist
          </Dialog.Title>
          <button 
            onClick={closeModal}
            className='btn btn-ghost btn-square self-end'>
            <XMarkIcon className='w-5 h-5'/>
          </button>
        </div>
        <ul className='flex-grow overflow-auto'>
          {
            !wishlist || wishlist.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <HeartIcon className='w-24 h-24'/>
                  <p className="mt-6 text-center text-2xl font-bold">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  {
                    wishlist.map((productHandle: string, index: number) => <WishlistLine key={index} productHandle={productHandle}/>)
                  }
                </div>
              )
          }
        </ul>
      </Dialog.Panel>
    </Dialog>
  </>
  )
}
