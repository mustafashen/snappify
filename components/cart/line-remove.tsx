'use-client'

import { CartItem } from "lib/shopify/types"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { removeItem } from "./actions"

export default function LineRemove({line}: {line: CartItem}) {
  
  const handleRemove = () => {
    removeItem(line, line.id)
  }
  
  return (
    <div>
      <button
        onClick={handleRemove}><XMarkIcon className="w-5 h-5"/></button>
    </div>
  )
}
