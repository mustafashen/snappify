'use client'
import Grid from "components/grid";
import { Product } from "lib/shopify/types";
import { useEffect, useState } from "react";
import { getMoreCollectionProducts, getNewCollectionProducts } from "./actions";
import CollectionSort from "components/sorting/collection-sort";
import { defaultSort } from "lib/constants";


export default function CollectionProducts({
  products, 
  title,
  collection,
  pageInfo
}: {
    products: Product[], 
    title?: string,
    collection: string,
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string
    }
  }) {
  const [currentProducts, setCurrentProducts] = useState(products);
  const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor);
  const [sortState, setSortState] = useState(defaultSort)

  const handleLoadMore = async () => {
    const nextProducts = await getMoreCollectionProducts({collection, sortKey: sortState.sortKey, reverse: sortState.reverse, cursor: endCursor})
    
    setEndCursor(nextProducts.pageInfo.endCursor)
    setHasNextPage(nextProducts.pageInfo.hasNextPage)
    setCurrentProducts([...currentProducts, ...(nextProducts.productList)])
  }

  useEffect(() => {
    getNewCollectionProducts({collection, sortKey: sortState.sortKey, reverse: sortState.reverse}).then((nextProducts) => {
      setEndCursor(nextProducts.pageInfo.endCursor)
      setHasNextPage(nextProducts.pageInfo.hasNextPage)
      setCurrentProducts([...(nextProducts.productList)])
    })
  }, [sortState, collection])

  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          {title}
        </h1>
        <CollectionSort
          sortState={sortState}
          setSortState={setSortState}
          />
      </div>
      <div>
        <Grid products={currentProducts}></Grid>
      </div>
      <div className="flex justify-center p-5">
        {hasNextPage ? (
          <button
            onClick={handleLoadMore}
            className="btn btn-outline btn-block">
            Load More
          </button>
        ) : (
          <button
            disabled={true}
            className="btn btn-outline btn-block btn-disabled">
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
