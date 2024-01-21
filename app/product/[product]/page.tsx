import InfoCard from 'components/product/info-card'
import { getProduct } from 'lib/shopify'
import { Product } from 'lib/shopify/types'
import Image from 'next/image'
import { Suspense } from 'react'

export default async function page({
  params,
  searchParams}: {
    params: {product: string},
    searchParams: { [key: string]: string } | string[] | undefined
  }) {
  
  const productParams = searchParams as { product: string }
  const productInfo: Product = 
    productParams.product && typeof productParams.product === 'string' ?
    JSON.parse(productParams.product) : await getProduct(params.product)
  
  return (
    <div className='card lg:card-side bg-base-100 shadow-xl'>
      <Suspense>
        <figure>
          {
            productInfo.images.length > 0 ? 
            productInfo.images.map((image, idx) => {
              return (
                <Image
                  src={image.url}
                  width={300}
                  height={300}
                  alt={image.altText}
                  key={idx}>
                </Image>
              )
            }) : 
            null
          }
        </figure>
        <InfoCard productInfo={productInfo}/>
      </Suspense>
    </div>
  )
}
