import NavbarMenuItems from './navbar-menu-items'
import { Blog, Menu } from 'lib/shopify/types'

export default async function NavbarMenu({menu, blogs}: {menu: Menu[], blogs: Blog[]}) { 
   
  return (
    <div className='flex items-center'>
      <NavbarMenuItems 
        menu={menu}
        blogs={blogs}
        />
    </div>
  )
}
