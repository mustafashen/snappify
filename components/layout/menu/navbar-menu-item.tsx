import { Menu } from "lib/shopify/types";
import Link from "next/link";

export default function NavbarMenuItem({menuItem}: {menuItem: Menu}) {
  return (
    <li>
      <Link
        href={{
          pathname: `${menuItem.path}`,
          query: {title: menuItem.title}
          }}
        className="btn btn-ghost btn-md">
        {menuItem.title}
      </Link>
    </li>
  )
}
