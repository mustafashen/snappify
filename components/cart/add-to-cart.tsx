import { ProductVariant } from 'lib/shopify/types'
import React from 'react'
import { addItem } from './actions'

export default function AddToCart({variant}: {variant?: ProductVariant}) {

  const handleAddCart = (variant: ProductVariant) => {
    addItem(null, variant.id)
  }

  if (variant && variant.availableForSale) {
    return (
      <button 
        className='btn btn-primary'
        onClick={() => handleAddCart(variant)}>
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
