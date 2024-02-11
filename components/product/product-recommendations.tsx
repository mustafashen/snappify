import Grid from 'components/grid'
import { getProductRecommendations } from 'lib/shopify'
import React from 'react'

export default async function ProductRecommendations({productId}: {productId: string}) {
  
  const recommendations = await getProductRecommendations(productId)

  return (
    <Grid products={recommendations}/>
  )
}
