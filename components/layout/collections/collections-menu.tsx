import { Collection } from 'lib/shopify/types'
import CollectionsMenuItem from './collections-menu-item'

export default function CollectionMenu({collections}: {collections: Collection[]}) {

  if (collections.length > 0) {
    return (
      <ul className='menu menu-horizontal'>
        {
          collections.map((collection) => (
            <CollectionsMenuItem 
              key={collection.handle}
              collection={collection}/>
          ))
        }
      </ul>
    )
  } else {
    // TODO: Suspense skeleton
    return <></>
  }
}
