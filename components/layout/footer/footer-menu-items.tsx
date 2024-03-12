import { Menu } from 'lib/shopify/types'
import FooterMenuItem from './footer-menu-item'

export default function FooterMenuItems({menu}: {menu: Menu[]}) {
  return (
    <div>
      {
        Array.isArray(menu) ? menu.map((menuItem: Menu) => {
          return (
            <FooterMenuItem key={menuItem.title} menuItem={menuItem}/>
          )
        }) : null
      }
    </div>
  )
}
