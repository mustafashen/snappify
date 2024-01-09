import { Menu } from 'lib/shopify/types'
import NavbarMenuItem from './navbar-menu-item'

export default function NavbarMenuItems({menu}: {menu: Menu[]}) {

  if (menu.length > 0) {
    return (
      <ul className='menu menu-horizontal'>
        {
          menu.map((menuItem, idx) => (
            <NavbarMenuItem 
              key={idx}
              menuItem={menuItem}/>
          ))
        }
      </ul>
    )
  } else {
    // TODO: Suspense skeleton
    return <></>
  }
}
