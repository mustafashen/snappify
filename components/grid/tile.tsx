import Price from 'components/price'
import { Product } from 'lib/shopify/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Tile({product}: {product: Product}) {

  return (
    <Link
    href={{
        pathname: `/product/${product.handle}`
    }}>
      <li className="card bg-base-100 shadow-xl grid grid-rows-5 aspect-[10/16] overflow-hidden">
        <div className='relative row-span-4'>
          <figure>
            {product.featuredImage ? 
            (
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              className='object-cover'
            />
            ) : null}
          </figure>
        </div>
        <div className="card-body row-span-1 flex flex-column justify-center">
          <h2 className="card-title">{product.title}</h2>
          <div>
            <Price
              amount={product.priceRange.minVariantPrice.amount}
              currencyCode={product.priceRange.minVariantPrice.currencyCode}
              />
          </div>
        </div>
      </li>
    </Link>
  )
}
