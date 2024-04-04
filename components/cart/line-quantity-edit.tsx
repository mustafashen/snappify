'use client'

import { CartItem } from 'lib/shopify/types'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
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
    <div className='join h-9 *:bg-base-200 *:hover:bg-base-200'>
      <button className="join-item rounded-l-3xl w-10 flex justify-center items-center" onClick={handleMinus}><MinusIcon className='w-5 h-5'/></button>
      <input className='join-item text-center w-6' value={line.quantity} onChange={handleChange}/>
      <button className="join-item rounded-r-3xl w-10 flex justify-center items-center" onClick={handlePlus}><PlusIcon className='w-5 h-5'/></button>
    </div>
  )
}
