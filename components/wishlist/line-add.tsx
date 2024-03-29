'use client'
import { Product } from "lib/shopify/types"
import { toggleItem } from "./actions"
import { HeartIcon } from "@heroicons/react/24/outline"

export default function AddToWishlist({product, className}: {product?: Product, className?: string}) {
  const handleToggleLine = (product: Product) => {
    toggleItem(product)
  }

  const buttonStyle = `btn ${className}`
  if (product) {
    return (
      <button 
        className={buttonStyle}
        onClick={() => handleToggleLine(product)}>
        <HeartIcon className="w-5 h-5"/>
      </button>
    )
  } else {
    return (
      <button
        disabled={true}
        className={`${buttonStyle} btn-disabled`}>
          <HeartIcon className="w-5 h-5"/>
      </button>
    )
  }

}
