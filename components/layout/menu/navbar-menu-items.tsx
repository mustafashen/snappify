import { Blog, Collection, Menu } from 'lib/shopify/types'
import NavbarMenuItem from './navbar-menu-item'
import Blogs from './blogs'
import Collections from './collections'

export default function NavbarMenuItems({
  menu, 
  blogs,
  collections
}: {
  menu: Menu[], 
  blogs: Blog[],
  collections: Collection[]
}) {

  if (menu.length > 0) {
    return (
      <ul className='flex gap-2 items-center'>
        {
          menu.map((menuItem, idx) => (
            <NavbarMenuItem 
              key={idx}
              menuItem={menuItem}/>
          ))
        }
        {
          collections && collections.length > 0 ? (
            <li>
              <Collections collections={collections}/>
            </li>
          ) : null
        }
        {
          blogs && blogs.length > 0 ? (
            <li> 
              <Blogs blogs={blogs}/>
            </li>
          ): null
        }
      </ul>
    )
  } else {
    return <></>
  }
}
