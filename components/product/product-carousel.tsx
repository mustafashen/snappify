import EmblaCarousel from 'components/embla-carousel'
import { Image as ProductImage } from 'lib/shopify/types'
import React from 'react'

export default function ProductCarousel({productImages}: {productImages: ProductImage[]}) {
  return (
    <div className='card'>
      <div className='card-body'>
        <EmblaCarousel
          slides={productImages}
        />
      </div>
    </div>
  )
}
