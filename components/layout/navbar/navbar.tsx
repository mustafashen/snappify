import Cart from 'components/cart'
import LogoIcon from 'components/icons/logo'
import NavbarMenu from '../menu'
import SearchBar from '../search/search-bar'
import UserAction from './user'
import MobileMenu from '../mobile-menu'
import { getBlogs, getCollections, getMenu } from 'lib/shopify'
import MobileSearch from '../search/mobile-search'
import Wishlist from 'components/wishlist'

export default async function Navbar() {
  const menu = await getMenu('main-menu')
  const blogs = await getBlogs({first: 10})
  const collections = await getCollections()
  return (
    <div className='bg-base-300'>
      <nav className='flex flex-nowrap items-center justify-between px-5 py-2 max-md:px-0'>
        <div className='flex flex-row flex-nowrap'>
          <MobileMenu 
            menu={menu}
            blogs={blogs}
            collections={collections}/>
          <div><LogoIcon/></div>
        </div>
        <div className='max-lg:hidden w-0 h-0 overflow-visible absolute flex justify-center items-center right-[50vw]'>
          <SearchBar/>
        </div>
        <div className='flex flex-nowrap'>
          <MobileSearch/>
          <Wishlist/>
          <Cart/>
          <UserAction/>
        </div>
      </nav>
      <nav className='flex flex-nowrap items-center justify-center max-xl:hidden'>
        <div>
          <NavbarMenu 
            menu={menu}
            blogs={blogs}
            collections={collections}/>
        </div>
      </nav>
    </div>
  )
}
