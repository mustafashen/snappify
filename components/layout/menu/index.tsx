import NavbarMenuItems from './navbar-menu-items'
import { Menu } from 'lib/shopify/types'

export default async function NavbarMenu({menu}: {menu: Menu[]}) {

  return (
    <div className='max-xl:hidden'>
      <NavbarMenuItems menu={menu}/>
    </div>
  )
}
