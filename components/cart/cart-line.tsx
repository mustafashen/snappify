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
    <li className='card card-side bg-base-100 shadow-sm box-border flex-nowrap' >
      <figure>
        <Image
          width={64}
          height={64}
          alt={
            line.merchandise.product.featuredImage.altText ||
            line.merchandise.product.title
          }
          src={line.merchandise.product.featuredImage.url}
        />
      </figure>
      <div className='card-body flex flex-col flex-nowrap'> 
        <Link
          href={merchandiseUrl}>
          <div className='card-title'>
            {line.merchandise.product.title}
          </div>
        </Link>
        <div>
          <Price
            amount={line.cost.totalAmount.amount}
            currencyCode={line.cost.totalAmount.currencyCode}
          />
          <LineQuantityEdit line={line}/>
          <LineRemove line={line}/>
        </div>
      </div>
    </li>
  )
}
