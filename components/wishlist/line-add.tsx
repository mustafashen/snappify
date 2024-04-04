'use client'
import { toggleItem } from "./actions"
import { HeartIcon } from "@heroicons/react/24/outline"

export default function AddToWishlist({productHandle, className}: {productHandle?: string, className?: string}) {
  const handleToggleLine = (productHandle: string) => {
    toggleItem(productHandle)
  }
  const buttonStyle = `btn btn-secondary ${className}`
  if (productHandle) {
    return (
      <button 
        className={buttonStyle}
        onClick={() => handleToggleLine(productHandle)}>
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
