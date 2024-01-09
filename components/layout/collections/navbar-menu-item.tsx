import { Menu } from "lib/shopify/types";
import Link from "next/link";

export default function NavbarMenuItem({menuItem}: {menuItem: Menu}) {
  return (
    <li>
      <Link
        href={{
          pathname: `${menuItem.path}`
          }}>
        {menuItem.title}
      </Link>
    </li>
  )
}
