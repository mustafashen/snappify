'use client'
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import CartLine from './cart-line'
import { Cart } from 'lib/shopify/types'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
export default function CartDrawer({ cart }: { cart: Cart | undefined }) {
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
        className='btn btn-ghost btn-square'
        type="button"
        onClick={openModal}>
          <ShoppingBagIcon className='w-5 h-5'/>
    </button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel className='fixed top-0 right-0 h-full w-1/5 max-xl:w-1/2 max-md:w-full p-4 flex flex-col card card-bordered shadow-xl bg-base-200 z-10'>
        <div className='navbar justify-between mb-4'>
          <Dialog.Title className='text-2xl card-title'>
            Cart
          </Dialog.Title>
          <button 
            onClick={closeModal}
            className='btn btn-ghost btn-square self-end'>
            <XMarkIcon className='w-5 h-5'/>
          </button>
        </div>
        <ul className='flex-grow'>
          {
            !cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBagIcon className='w-24 h-24'/>
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  {
                    cart.lines.map((line, index) => <CartLine key={index} line={line} />)
                  }
                </div>
              )
          }
        </ul>
        <div>
          <a
            className='btn btn-block btn-primary'
            href={cart?.checkoutUrl}>
              Checkout
          </a>
        </div>
      </Dialog.Panel>
    </Dialog>
  </>
  )
}
