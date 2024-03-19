'use client'

import { Menu } from "@headlessui/react"
import { Collection } from "lib/shopify/types"
import Link from "next/link"

export default function Collections({collections}: {collections: Collection[]}) {
  return (
    <Menu as={'div'} className="dropdown">
      <Menu.Button className='btn btn-ghost btn-md'>
        All Collections
      </Menu.Button>
      <Menu.Items>
        <ul className='dropdown-content w-[200px] z-[1] menu bg-base-200'>
          {
            collections.map((collection, index) => (
              <li key={index}>
                <Menu.Item>
                  <Link
                    href={{
                      pathname: `/search/${collection.handle}`
                    }}>
                    {collection.title}
                  </Link>
                </Menu.Item>
              </li>
            ))
          }
        </ul>
      </Menu.Items>
    </Menu>
  )
}
