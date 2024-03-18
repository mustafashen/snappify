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
    <div>
      <nav className='flex flex-nowrap items-center justify-between px-5 py-2'>
        <div className='flex flex-row flex-nowrap'>
          <MobileMenu menu={menu}/>
          <div><LogoIcon/></div>
        </div>
        <div className='max-lg:hidden'>
          <SearchBar/>
        </div>
        <div className=''>
          <MobileSearch/>
          <Cart/>
          <UserAction/>
        </div>
      </nav>
      <nav className='flex flex-nowrap items-center justify-center max-xl:hidden bg-base-200'>
        <div className=''>
          <NavbarMenu 
            menu={menu}/>
        </div>
      </nav>
    </div>
  )
}
