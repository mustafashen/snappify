import React from 'react'
import { getProducts } from 'lib/shopify'
import Slider from 'components/slider'

export default async function BestSellers() {
  const products = await getProducts({first: 6, sortKey: 'BEST_SELLING'})
  return (
    <div className='card'>
      <div className='card-body'>
        <h1 className='font-bold text-2xl'>Best Sellers</h1>
        <Slider products={products}/>
      </div>
    </div>
  )
}
