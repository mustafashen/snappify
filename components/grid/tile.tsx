import Price from 'components/price'
import { Product } from 'lib/shopify/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Tile({product}: {product: Product}) {

  return (
    <li className="card bg-base-100 shadow-xl grid grid-rows-3 aspect-[10/16]">
      <figure className='row-span-2 overflow-hidden'>
        {product.images[0] ? 
        (
        <Image
          src={product.images[0]?.url}
          alt={product.title}
          width={0}
          height={0}
          sizes="100vw"
          className='w-fit h-fit'
        />
        ) : null}
      </figure>
      <div className="card-body row-span-1 flex flex-column justify-center">
        <Link
          href={{
              pathname: `/product/${product.handle}`,
              query: { product: JSON.stringify(product) },
          }}>
          <h2 className="card-title">{product.title}</h2>
          <p>{product.description}</p>
        </Link>
        <div>
          <Price
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            />
        </div>
      </div>
    </li>
  )
}
