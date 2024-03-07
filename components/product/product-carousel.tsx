import EmblaCarousel from 'components/embla-carousel'
import { Image as ProductImage } from 'lib/shopify/types'
import React from 'react'

export default function ProductCarousel({productImages}: {productImages: ProductImage[]}) {
  return (
    <EmblaCarousel
      slides={productImages}
    />
  )
}
