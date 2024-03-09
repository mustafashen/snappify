import Cart from 'components/cart'
import LogoIcon from 'components/icons/logo'
import NavbarMenu from '../menu'
import SearchBar from '../search/search-bar'
import UserAction from './user'
import MobileMenu from '../mobile-menu'
import { getMenu } from 'lib/shopify'
import MobileSearch from '../search/mobile-search'

export default async function Navbar() {
  const menu = await getMenu('main-menu')
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-start flex flex-row flex-nowrap'>
          <MobileMenu menu={menu}/>
          <div><LogoIcon/></div>
          <NavbarMenu 
            menu={menu}/>
        </div>
        <div className='max-lg:hidden'>
          <SearchBar/>
        </div>
        <div className='navbar-end'>
          <MobileSearch/>
          <Cart/>
          <UserAction/>
        </div>
      </nav>
    </>
  )
}
