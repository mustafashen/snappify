import { getMenu, getPolicies } from 'lib/shopify'
import FooterMenuItems from './footer-menu-items'
import Socials from './socials'
import LogoIcon from 'components/icons/logo'
import Link from 'next/link'
import FooterPolicies from './footer-policies'

export default async function Footer() {
  const menu = await getMenu('footer')
  const policies = await getPolicies()
  return (
    <div className='bg-base-100'>
      <div className='footer p-5 text-base-content'>
        <LogoIcon/>
        <FooterMenuItems menu={menu}/>
        <FooterPolicies policies={policies}/>
        <Socials/>
      </div>
      <div className='flex gap-2 px-5 py-4 border-t text-base-content'>
        <span>
        {
          new Date().getFullYear()
        }
        </span>
        <span>•</span>
        <Link
          className='link link-hover'
          href='https://mustafasen.dev'>
            Credits
        </Link>
      </div>
    </div>
  )
}
