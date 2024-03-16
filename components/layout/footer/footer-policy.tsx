import { ShopPolicy } from 'lib/shopify/types'
import Link from 'next/link'
import React from 'react'

export default function FooterPolicy({policy}: {policy: ShopPolicy}) {
  return (
    <Link
      className='link link-hover' 
      href={{
        pathname: `/policy/${policy.handle}`,
        query: {title: policy.title}
      }}>
      {
        policy.title
      }
    </Link>
  )
}
