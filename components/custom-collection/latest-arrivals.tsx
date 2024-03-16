import React from 'react'
import { getProducts } from 'lib/shopify'
import Tile from 'components/grid/tile'

export default async function LatestArrivals() {
  const products = await getProducts({first: 4, sortKey: 'CREATED_AT'})
  return (
    <div className='card'>
      <div className='card-body'>
        <h1 className='font-bold text-2xl'>Latest Arrivals</h1>
        <ul className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-center gap-5'>
          {
            products.map((product, idx) => (
              <Tile key={idx} product={product}/>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
