import { getCollections } from 'lib/shopify'
import CollectionMenu from './collections-menu'

export default async function Collections() {

  const collections = await getCollections()
  return (
    <CollectionMenu collections={collections}/>
  )
}
