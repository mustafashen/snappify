import Cart from 'components/cart'
import LogoIcon from 'components/icons/logo'

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-start flex flex-row flex-nowrap gap-3'>
        <div><LogoIcon/></div>
        <div>Collections</div>
      </div>
      <div className='navbar-end'>
        <Cart/>
      </div>
    </nav>
  )
}
