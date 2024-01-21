'use client'

import { CartItem } from 'lib/shopify/types'
import { Minus, Plus } from 'react-feather'
import { updateItemQuantity } from './actions'

export default function LineQuantityEdit({line}: {line: CartItem}) {

  const handleUpdate = (prevQuantity: number, newQuantity: number) => {

    updateItemQuantity(prevQuantity,{
      lineId: line.id,
      quantity: newQuantity,
      variantId: line.merchandise.id
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value)
    const quantity = line.quantity
    handleUpdate(quantity, newQuantity)
  }

  const handleMinus = () => {
    const quantity = line.quantity
    handleUpdate(quantity, quantity - 1)
  }

  const handlePlus = () => {
      const quantity = line.quantity
      handleUpdate(quantity, quantity + 1)
  }
  

  return (
    <div className='cart-actions'>
      <div className='join grid grid-cols-3 w-32'>
        <button className="join-item btn btn-outline" onClick={handleMinus}><Minus/></button>
        <input className='join-item input input-bordered text-center' value={line.quantity} onChange={handleChange}/>
        <button className="join-item btn btn-outline" onClick={handlePlus}><Plus/></button>
      </div>
    </div>
  )
}
