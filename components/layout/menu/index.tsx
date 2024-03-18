import NavbarMenuItems from './navbar-menu-items'
import { Menu } from 'lib/shopify/types'

export default async function NavbarMenu({menu}: {menu: Menu[]}) {

  return (
    <div>
      <NavbarMenuItems menu={menu}/>
    </div>
  )
}
