import Tile from 'components/grid/tile'
import { getProductRecommendations } from 'lib/shopify'
import React from 'react'

export default async function ProductRecommendations({productId}: {productId: string}) {
  
  const recommendations = await getProductRecommendations(productId)

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='card-title'>Similar Products</h2>
        <div className='overflow-x-auto flex flex-row flex-nowrap'>
          {
            recommendations.map((product) => (
              <Tile
                key={product.id} 
                product={product}/>
            ))
          }  
        </div>
      </div>
    </div>
  )
}
