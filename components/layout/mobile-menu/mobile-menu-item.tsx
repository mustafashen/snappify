import { Menu } from "lib/shopify/types";
import Link from "next/link";

export default function MobileMenuItem({menuItem}: {menuItem: Menu}) {
  return (
    <li>
      <Link
        href={{
          pathname: `${menuItem.path}`,
          query: {title: menuItem.title}
          }}
        className="py-2 pl-5 w-full inline-block hover:bg-base-100">
        {menuItem.title}
      </Link>
    </li>
  )
}
