'use-client'

import { CartItem } from "lib/shopify/types"
import { X } from "react-feather"
import { removeItem } from "./actions"

export default function LineRemove({line}: {line: CartItem}) {
  
  const handleRemove = () => {
    removeItem(line, line.id)
  }
  
  return (
    <div>
      <button
        onClick={handleRemove}><X/></button>
    </div>
  )
}
