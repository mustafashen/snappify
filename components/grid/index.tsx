import { Product } from 'lib/shopify/types'
import React from 'react'
import Tile from './tile'

export default function Grid({products}: {products: Product[]}) {
  
  return (
    <ul className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-center gap-5 p-5'>
      {
        products.map((product, idx) => (
          <Tile key={idx} product={product}/>
        ))
      }
    </ul>
  )
}
