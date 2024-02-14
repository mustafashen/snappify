import InfoCard from 'components/product/info-card'
import ProductCarousel from 'components/product/product-carousel'
import ProductRecommendations from 'components/product/product-recommendations'
import { HIDDEN_PRODUCT_TAG } from 'lib/constants'
import { getProduct } from 'lib/shopify'
import { Product } from 'lib/shopify/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { product: string },
  searchParams: { [key: string]: string } | string[] | undefined
}): Promise<Metadata> {

  const productParams = searchParams as { product: string }
  const productInfo: Product =
    productParams.product && typeof productParams.product === 'string' ?
      JSON.parse(productParams.product) : await getProduct(params.product)

  const product = productInfo ? productInfo : await getProduct(params.product);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
        images: [
          {
            url,
            width,
            height,
            alt
          }
        ]
      }
      : null
  };
}

export default async function page({
  params,
  searchParams }: {
    params: { product: string },
    searchParams: { [key: string]: string } | string[] | undefined
  }) {

  const productParams = searchParams as { product: string }
  const productInfo: Product =
    productParams.product && typeof productParams.product === 'string' ?
      JSON.parse(productParams.product) : await getProduct(params.product)

  return (
    <div>
      <div className='card bg-base-100 shadow-xl grid grid-cols-2'>
        <figure>
          {
            productInfo.images.length > 0 ?
              <ProductCarousel productImages={productInfo.images}/> :
              null
          }
        </figure>
        <InfoCard productInfo={productInfo} />
      </div>
      <div>
        <ProductRecommendations productId={productInfo.id}/>
      </div>
  </div>
  )
}
