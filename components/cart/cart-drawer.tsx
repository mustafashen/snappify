'use client'
import { ShoppingBag, X } from 'react-feather'
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
        className='btn btn-ghost'
        type="button"
        onClick={openModal}>
          <ShoppingBag />
    </button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel className='fixed bg-base-200 top-0 right-0 h-full w-1/6'>
        <div className='navbar justify-between'>
          <Dialog.Title className='text-2xl'>
            Cart
          </Dialog.Title>
          <button 
            onClick={closeModal}
            className='btn btn-ghost self-end'>
            <X/>
          </button>
        </div>
        <ul>
          {
            !cart || cart.lines.length === 0 ?
              (<div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <ShoppingBag size={50} />
                <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
              </div>) :
              (<div>
                {
                  cart.lines.map((line, index) => <CartLine key={index} line={line} />)
                }
              </div>)
          }
        </ul>
      </Dialog.Panel>
    </Dialog>
  </>
  )
}
