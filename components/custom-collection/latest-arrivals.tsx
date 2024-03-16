import React from 'react'
import { getProducts } from 'lib/shopify'
import Slider from 'components/slider'

export default async function LatestArrivals() {
  const products = await getProducts({first: 6, sortKey: 'CREATED_AT'})
  return (
    <div className='card'>
      <div className='card-body'>
        <h1 className='font-bold text-2xl'>Latest Arrivals</h1>
        <Slider products={products}/>
      </div>
    </div>
  )
}
