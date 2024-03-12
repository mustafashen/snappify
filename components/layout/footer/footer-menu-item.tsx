import { Menu } from 'lib/shopify/types'
import Link from 'next/link'
import React from 'react'

export default function FooterMenuItem({menuItem}: {menuItem: Menu}) {
  return (
    <div>
      <Link href={menuItem.path}>
        {
          menuItem.title
        }
      </Link>
    </div>
  )
}
