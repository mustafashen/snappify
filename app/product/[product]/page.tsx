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
  params}: {
    params: { product: string },
    searchParams: { [key: string]: string } | string[] | undefined
  }) {

  const productInfo: Product | undefined = await getProduct(params.product)

  if (!productInfo) return <h1>Product not found!</h1>
  else {
    return (
      <div>
        <div className='card card-side bg-base-100 shadow-xl grid lg:grid-cols-2 max-lg:grid-rows-2 min-h-[90vh] mt-10'>
          <figure>
            {
              productInfo.images.length > 0 ?
                <ProductCarousel productImages={productInfo.images}/> :
                null
            }
          </figure>
          {
            <InfoCard productInfo={productInfo} />
          }
        </div>
        <div className='my-10'>
            <ProductRecommendations productId={productInfo.id}/>
        </div>
    </div>
    )
  }
}
