import Cart from 'components/cart'
import LogoIcon from 'components/icons/logo'
import NavbarMenu from '../menu'
import SearchBar from '../search/search-bar'
import UserAction from './user'

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-start flex flex-row flex-nowrap gap-3'>
        <div><LogoIcon/></div>
        <NavbarMenu/>
      </div>
      <SearchBar/>
      <div className='navbar-end'>
        <Cart/>
        <UserAction/>
      </div>
    </nav>
  )
}
