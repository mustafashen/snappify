import { getMenu } from 'lib/shopify'
import FooterMenuItems from './footer-menu-items'
import Socials from './socials'
import LogoIcon from 'components/icons/logo'
import Link from 'next/link'

export default async function Footer() {
  const menu = await getMenu('footer')
  return (
    <div>
      <div className='footer p-5 text-base-content'>
        <LogoIcon/>
        <FooterMenuItems menu={menu}/>
        <Socials/>
      </div>
      <div className='px-5 py-4 border-t text-base-content'>
        {
          new Date().getFullYear()
        }
        &nbsp;•&nbsp;
        <Link
          className='link link-hover'
          href='https://mustafasen.dev'>
            Credits
        </Link>
      </div>
    </div>
  )
}
