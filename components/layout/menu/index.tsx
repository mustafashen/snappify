import NavbarMenuItems from './navbar-menu-items'
import { Blog, Collection, Menu } from 'lib/shopify/types'

export default async function NavbarMenu({
  menu, 
  blogs,
  collections
}: {
  menu: Menu[], 
  blogs: Blog[],
  collections: Collection[]
}) { 
   
  return (
    <div className='flex items-center'>
      <NavbarMenuItems 
        menu={menu}
        blogs={blogs}
        collections={collections}
        />
    </div>
  )
}
