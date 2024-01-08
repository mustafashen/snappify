import { getCollectionProducts } from "lib/shopify"
import { Collection } from "lib/shopify/types"


// TODO: Add metadata
export default async function page({searchParams}: {searchParams: {data: string}}) {
  const collectionParams: Collection = JSON.parse(searchParams.data)
  
  const collectionProducts = await getCollectionProducts({collection: collectionParams.handle})

  return (
    <div>A collection</div>
  )
}
