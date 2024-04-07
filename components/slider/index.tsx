import Tile from 'components/grid/tile'
import { Product } from 'lib/shopify/types'
import React from 'react'

export default function Slider({products}: {products: Product[]}) {
  return (
    <ul className='flex flex-nowrap w-full h-[500px] overflow-y-scroll snap-x snap-mandatory *:snap-center gap-5 py-10'>
      {
        products.map((product, idx) => (
          <Tile key={idx} product={product}/>
        ))
      }
    </ul>
  )
}
