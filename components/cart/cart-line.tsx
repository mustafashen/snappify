import { DEFAULT_OPTION } from 'lib/constants';
import { CartItem } from 'lib/shopify/types'
import { createUrl } from 'lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import LineQuantityEdit from './line-quantity-edit';
import Price from 'components/price';
import LineRemove from './line-remove';

type MerchandiseSearchParams = {
  [key: string]: string;
}

export default function CartLine({line}: {line: CartItem}) {

  const merchandiseSearchParams = {} as MerchandiseSearchParams;

  line.merchandise.selectedOptions.forEach(({ name, value }) => {
    if (value !== DEFAULT_OPTION) {
      merchandiseSearchParams[name.toLowerCase()] = value
    }
  })

  const merchandiseUrl = createUrl(
    `/product/${line.merchandise.product.handle}`,
    new URLSearchParams(merchandiseSearchParams)
  )

  return (
    <li>
      <div className="card card-side bg-base-100 shadow-xl w-full h-36 grid grid-cols-3 overflow-hidden">
        <div className='relative col-span-1'>
          <figure>
            <Image
              alt={
                line.merchandise.product.featuredImage.altText ||
                line.merchandise.product.title
              }
              src={line.merchandise.product.featuredImage.url}
              fill
            />
          </figure>
        </div>
        <div className="card-body col-span-2">
            <Link
              href={merchandiseUrl}
              className='flex-grow'>
              <h2 className="card-title">{line.merchandise.product.title}</h2>
              <Price
                amount={line.cost.totalAmount.amount}
                currencyCode={line.cost.totalAmount.currencyCode}
              />
            </Link>
            <div className="card-actions">
              <LineQuantityEdit line={line}/>
              <LineRemove 
                line={line}
                classname='absolute top-4 right-4'/>
            </div>
        </div>
      </div>
    </li>
  )
}
