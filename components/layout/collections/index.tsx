import { getMenu } from 'lib/shopify'
import NavbarMenuItems from './navbar-menu-items'

export default async function NavbarMenu() {

  const menu = await getMenu('main-menu')
  return (
    <NavbarMenuItems menu={menu}/>
  )
}
