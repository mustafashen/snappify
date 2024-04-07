'use client'
import { useEffect, useState } from "react"
import { getWishlist, toggleItem } from "./actions"
import { HeartIcon as HeartChecked } from "@heroicons/react/24/solid"
import { HeartIcon as HeartUnChecked } from "@heroicons/react/24/outline"

export default function AddToWishlist({productHandle, className}: {productHandle: string, className?: string}) {
  const [wistlisted, setWistlisted] = useState(false)

  const handleToggleLine = (productHandle: string) => {
    toggleItem(productHandle)
    setWistlisted(!wistlisted)
  }

  useEffect(() => {
    getWishlist().then((wishlist: string[]) => {
      wishlist.includes(productHandle) ? setWistlisted(true) : setWistlisted(false)
    })
  },[productHandle])

  const buttonStyle = `btn btn-secondary ${className}`
    return (
      <button 
        className={buttonStyle}
        onClick={() => handleToggleLine(productHandle)}>
        {
          wistlisted ? 
            <HeartChecked className="w-5 h-5"/> : 
            <HeartUnChecked className="w-5 h-5"/>
        }
      </button>
    )
}
