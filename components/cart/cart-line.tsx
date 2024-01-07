import { DEFAULT_OPTION } from 'lib/constants';
import { CartItem } from 'lib/shopify/types'
import { createUrl } from 'lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import LineQuantityEdit from './line-quantity-edit';
import Price from 'components/price';

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
    <li className='card card-side bg-base-100 shadow-sm'>
      <div>
        <Image
          className="h-full w-full object-cover"
          width={64}
          height={64}
          alt={
            line.merchandise.product.featuredImage.altText ||
            line.merchandise.product.title
          }
          src={line.merchandise.product.featuredImage.url}
        />
      </div>
      <div className='card-body'> 
        <Link href={merchandiseUrl}>
          <div className='card-title'>{line.merchandise.product.title}</div>
        </Link>
        <Price
          className="text-right text-base text-black dark:text-white"
          amount={line.cost.totalAmount.amount}
          currencyCode={line.cost.totalAmount.currencyCode}
        />
        <LineQuantityEdit/>
      </div>
    </li>
  )
}
