import React from 'react'
import NavbarMenuItem from '../menu/navbar-menu-item'
import { Menu } from 'lib/shopify/types'

export default async function MobileMenuItems({menu}: {menu: Menu[]}) {

  return (
    <ul>
    {
      menu.length > 0 ? (
        <ul className='menu menu-vertical'>
          {
            menu.map((menuItem, idx) => (
              <NavbarMenuItem 
                key={idx}
                menuItem={menuItem}/>
            ))
          }
        </ul>
      ) : <></>
    }
  </ul>
  )
}
