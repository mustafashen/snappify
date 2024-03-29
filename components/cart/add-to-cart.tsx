import { ProductVariant } from 'lib/shopify/types'
import React from 'react'
import { addItem } from './actions'

export default function AddToCart({variant, className}: {variant?: ProductVariant, className?: string}) {

  const handleAddCart = (variant: ProductVariant) => {
    addItem(null, variant.id)
  }
  const buttonStyle = `btn ${className}`
  if (variant && variant.availableForSale) {
    return (
      <button 
        className={buttonStyle}
        onClick={() => handleAddCart(variant)}>
        Add to cart
      </button>
    )
  } else {
    return (
      <button
        disabled={true}
        className={`${buttonStyle} btn-disabled`}>
          Out of stock
      </button>
    )
  }

}
