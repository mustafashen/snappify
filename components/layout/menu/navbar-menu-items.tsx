import { Blog, Menu } from 'lib/shopify/types'
import NavbarMenuItem from './navbar-menu-item'
import Blogs from './blogs'

export default function NavbarMenuItems({menu, blogs}: {menu: Menu[], blogs: Blog[]}) {

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
