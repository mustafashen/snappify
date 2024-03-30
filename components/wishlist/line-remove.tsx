'use-client'

import { XMarkIcon } from "@heroicons/react/24/outline"
import { toggleItem } from "./actions"

export default function LineRemove({
  productHandle,
  classname }: {
    productHandle: string,
    classname?: string
  }) {
  
  const handleRemove = () => {
    toggleItem(productHandle)
  }
  
  return (
    <div className={classname}>
      <button
        onClick={handleRemove}><XMarkIcon className="w-5 h-5"/></button>
    </div>
  )
}
