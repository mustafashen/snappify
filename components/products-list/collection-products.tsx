'use client'
import Grid from "components/grid";
import { Product } from "lib/shopify/types";
import { useState } from "react";
import { getMoreCollectionProducts } from "./actions";
import CollectionSort from "components/search/collection-sort";


export default function CollectionProducts({
  products, 
  title,
  sortKey,
  reverse,
  collection,
  pageInfo
}: {
    products: Product[], 
    title?: string,
    sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE',
    reverse: boolean,
    collection: string,
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string
    }
  }) {
  const [currentProducts, setCurrentProducts] = useState(products);
  const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor);
  const handleLoadMore = async () => {
    const nextProducts = await getMoreCollectionProducts({collection, sortKey, reverse, cursor: endCursor})
    
    console.log(nextProducts)
    setEndCursor(nextProducts.pageInfo.endCursor)
    setHasNextPage(nextProducts.pageInfo.hasNextPage)
    setCurrentProducts([...currentProducts, ...(nextProducts.productList)])
  }

  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          {title}
        </h1>
        <CollectionSort/>
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
