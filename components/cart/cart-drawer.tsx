import { ShoppingBag } from 'react-feather'
import CartLine from './cart-line'
import { Cart } from 'lib/shopify/types'
export default function CartDrawer({cart}: {cart: Cart | undefined}) {
  return (
    <div className="drawer drawer-end">
    <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content ml-auto">
      <label htmlFor="cart-drawer" className="btn btn-ghost drawer-button"><ShoppingBag/></label>
    </div> 
      <div className="drawer-side">
        <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {
            !cart || cart.lines.length === 0 ? 
              (<div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <ShoppingBag size={50}/>
                <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
              </div>) :
              (<div>
                {
                  cart.lines.map((line, index) => <CartLine key={index} line={line}/>)
                }
              </div>)
          }
        </ul>
      </div>
    </div>
  )
}
