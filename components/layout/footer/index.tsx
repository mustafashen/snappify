import { getMenu } from 'lib/shopify'
import FooterMenuItems from './footer-menu-items'

export default async function Footer() {
  const menu = await getMenu('footer')
  return (
    <FooterMenuItems menu={menu}/>
  )
}
