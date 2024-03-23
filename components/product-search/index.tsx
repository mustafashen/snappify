'use client'
import Grid from "components/grid";
import SearchSort from "components/search/search-sort";
import { Product } from "lib/shopify/types";
import { useState } from "react";
import { getMoreProducts } from "./actions";


export default function ProductsSearch({
  products, 
  searchValue,
  sortKey,
  reverse,
  query,
  pageInfo
}: {
    products: Product[], 
    searchValue?: string,
    sortKey: 'RELEVANCE' | 'PRICE',
    reverse: boolean,
    query?: string,
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string
    }
  }) {
  const [currentProducts, setCurrentProducts] = useState(products);
  const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor);
  const handleLoadMore = async () => {
    const nextProducts = await getMoreProducts({sortKey, reverse, query, cursor: endCursor})
    
    setEndCursor(nextProducts.pageInfo.endCursor)
    setHasNextPage(nextProducts.pageInfo.hasNextPage)
    setCurrentProducts([...currentProducts, ...(nextProducts.productList)])
  }

  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          Results for &quot;{searchValue}&quot;
        </h1>
        <SearchSort/>
      </div>
      <div>
        <Grid
          products={currentProducts}/>
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
            onClick={handleLoadMore}
            className="btn btn-outline btn-block btn-disabled">
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
