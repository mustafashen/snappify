import { Blog, Collection, Menu } from 'lib/shopify/types'
import Link from 'next/link'
import MobileMenuItem from './mobile-menu-item'

export default function MobileMenuItems({
  menu, 
  blogs,
  collections
  }: {
    menu: Menu[], 
    blogs: Blog[]
    collections: Collection[]
  }) {

  return (
    <div>
      <div>
        <h2 className='text-xl font-semibold py-4 pl-5'>Featured</h2>
        {
          menu.length > 0 ? (
            <ul>
              {
                menu.map((menuItem, idx) => (
                  <MobileMenuItem 
                    key={idx}
                    menuItem={menuItem}/>
                ))
              }
            </ul>
          ) : null
        }
      </div>
      <div>
        <h2 className='text-xl font-semibold py-4 pl-5'>Collections</h2>
        {
          collections && collections.length > 0 ? (
            <ul>
              {
                collections.map((collection, idx) => (
                  <MobileMenuItem 
                    key={idx}
                    menuItem={collection}/>
                ))
              }
            </ul>
          ) : null
        }
      </div>
      <div>
        <h2 className='text-xl font-semibold py-4 pl-5'>Stories</h2>
        {
          blogs && blogs.length > 0 ? (
            <ul>
              {
                blogs.map((blog, idx) => (
                  <li 
                    key={idx}>
                    <Link
                      className='py-2 pl-5 w-full inline-block hover:bg-base-100'
                      href={{
                      pathname: `/blogs/${blog.handle}`,
                      query: {id: blog.id}
                      }}>
                        {blog.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          ) : null
        }
      </div>
    </div>
  )
}
