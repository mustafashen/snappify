'use-client'

import { Product } from "lib/shopify/types"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { toggleItem } from "./actions"

export default function LineRemove({
  line,
  classname }: {
    line: Product,
    classname?: string
  }) {
  
  const handleRemove = () => {
    toggleItem(line.id)
  }
  
  return (
    <div className={classname}>
      <button
        onClick={handleRemove}><XMarkIcon className="w-5 h-5"/></button>
    </div>
  )
}
