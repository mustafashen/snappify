import { ProductVariant } from 'lib/shopify/types'
import React from 'react'
import { addItem } from './actions'

export default function AddToCart({variant}: {variant: ProductVariant}) {

  const handleAddCart = () => {
    addItem(null, variant.id)
  }

  if (variant.availableForSale) {
    return (
      <button 
        className='btn btn-primary'
        onClick={handleAddCart}>
        Add to cart
      </button>
    )
  } else {
    return (
      <button
        disabled={true}
        className='btn btn-disabled'>
          Out of stock
      </button>
    )
  }

}
