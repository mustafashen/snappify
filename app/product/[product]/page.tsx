import InfoCard from 'components/product/info-card'
import { Product } from 'lib/shopify/types'
import Image from 'next/image'

export default async function page({
  searchParams}: {
    searchParams: { [key: string]: string } | string[] | undefined
  }) {
  
  // TODO: Prop checking before parsing
  const productParams = searchParams as { product: string }
  const productInfo: Product = JSON.parse(productParams.product)

  return (
    <div className='card lg:card-side bg-base-100 shadow-xl'>
      <figure>
        {
          productInfo.images.length > 0 ? 
          productInfo.images.map((image, idx) => {
            return (
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.altText}
                key={idx}>
              </Image>
            )
          }) : 
          null
        }
      </figure>
      <InfoCard productInfo={productInfo}/>
    </div>
  )
}
