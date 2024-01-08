import { Collection } from "lib/shopify/types";
import Link from "next/link";

export default function CollectionsMenuItem({collection}: {collection: Collection}) {
  return (
    <li>
      <Link
        href={{
          pathname: `${collection.path}`,
          query: {
            data: JSON.stringify(collection)
          } 
          }}>
        {collection.title}
      </Link>
    </li>
  )
}
