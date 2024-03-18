'use client'

import { Menu } from "@headlessui/react"
import { Blog } from "lib/shopify/types"
import Link from "next/link"

export default function Blogs({blogs}: {blogs: Blog[]}) {
  return (
    <Menu as={'div'} className="dropdown">
      <Menu.Button className='btn btn-ghost btn-md'>
        Stories
      </Menu.Button>
      <Menu.Items>
        <ul className='dropdown-content z-[1] menu bg-base-200'>
          {
            blogs.map((blog, index) => (
              <li key={index}>
                <Menu.Item>
                  <Link
                    href={{
                      pathname: `/blogs/${blog.handle}`,
                      query: {id: blog.id}  
                    }}>
                    {blog.title}
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
