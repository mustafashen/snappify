'use client'
import { ShoppingBag, X } from 'react-feather'
import CartLine from './cart-line'
import { Cart } from 'lib/shopify/types'
import * as Dialog from '@radix-ui/react-dialog';
export default function CartDrawer({ cart }: { cart: Cart | undefined }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className='btn btn-ghost'><ShoppingBag /></button>
      </Dialog.Trigger>
      <Dialog.DialogPortal>
        <Dialog.Overlay className='bg-black/50 inset-0 fixed' />
        <Dialog.Content className='fixed bg-base-200 top-0 right-0 h-full w-1/6 menu menu-vertical'>
          <div className='flex flex-row flex-nowrap justify-between items-center'>
            <Dialog.Title>
              <h1 className='menu-title text-2xl'>Cart</h1>
            </Dialog.Title>
            <Dialog.Close>
              <button className='btn btn-ghost'>
                <X />
              </button>
            </Dialog.Close>
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
        </Dialog.Content>
      </Dialog.DialogPortal>
    </Dialog.Root>
  )
}
