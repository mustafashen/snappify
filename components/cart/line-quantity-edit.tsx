'use client'

import { CartItem } from 'lib/shopify/types'
import { useState } from 'react'
import { Minus, Plus } from 'react-feather'
import { updateItemQuantity } from './actions'

export default function LineQuantityEdit({line}: {line: CartItem}) {

  const [quantity, setQuantity] = useState(line.quantity)

  const handleUpdate = (prevQuantity: number, newQuantity: number) => {
  
    setQuantity(newQuantity)
  
    updateItemQuantity(prevQuantity,{
      lineId: line.id,
      quantity: newQuantity,
      variantId: line.merchandise.id
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value)
    handleUpdate(quantity, newQuantity)
  }

  const handleMinus = () => {
    handleUpdate(quantity, quantity - 1)
  }

  const handlePlus = () => {
    handleUpdate(quantity, quantity + 1)
  }
  

  return (
    <div className='cart-actions'>
      <div className='join'>
        <button className="join-item btn btn-outline" onClick={handleMinus}><Minus/></button>
        <input className='join-item input input-bordered text-center' value={quantity} onChange={handleChange}/>
        <button className="join-item btn btn-outline" onClick={handlePlus}><Plus/></button>
      </div>
    </div>
  )
}
