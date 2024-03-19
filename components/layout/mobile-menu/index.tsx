import { Blog, Collection, Menu } from "lib/shopify/types";
import MobileDrawer from "./mobile-drawer";

export default function MobileMenu({
  menu, 
  blogs,
  collections
  }: {
    menu: Menu[], 
    blogs: Blog[]
    collections: Collection[]
  }) {
  return (
    <>
      <MobileDrawer 
        menu={menu}
        blogs={blogs}
        collections={collections}/>
    </>
  )
}
