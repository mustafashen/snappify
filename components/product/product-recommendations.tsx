import Slider from 'components/slider'
import { getProductRecommendations } from 'lib/shopify'
import React from 'react'

export default async function ProductRecommendations({productId}: {productId: string}) {
  
  const recommendations = await getProductRecommendations(productId)

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='card-title'>Similar Products</h2>
        <Slider products={recommendations}/>
      </div>
    </div>
  )
}
