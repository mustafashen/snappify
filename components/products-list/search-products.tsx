'use client'
import Grid from "components/grid";
import SearchSort from "components/sorting/search-sort";
import { Product } from "lib/shopify/types";
import { useEffect, useState } from "react";
import { getMoreSearchProducts, getNewSearchProducts } from "./actions";
import { defaultSort } from "lib/constants";


export default function SearchProducts({
  products, 
  searchValue,
  query,
  pageInfo
}: {
    products: Product[], 
    searchValue?: string,
    query?: string,
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
    const nextProducts = await getMoreSearchProducts({sortKey: sortState.sortKey, reverse: sortState.reverse, query, cursor: endCursor})
    
    setEndCursor(nextProducts.pageInfo.endCursor)
    setHasNextPage(nextProducts.pageInfo.hasNextPage)
    setCurrentProducts([...currentProducts, ...(nextProducts.productList)])
  }

  useEffect(() => {
    getNewSearchProducts({query, sortKey: sortState.sortKey, reverse: sortState.reverse}).then((nextProducts) => {
      setEndCursor(nextProducts.pageInfo.endCursor)
      setHasNextPage(nextProducts.pageInfo.hasNextPage)
      setCurrentProducts([...(nextProducts.productList)])
    })
  }, [sortState, query])

  return (
    <div>
      <div className="p-5 flex flex-col">
        <h1
          className="text-xl font-semibold">
          Results for &quot;{searchValue}&quot;
        </h1>
        <div className="max-sm:w-36 self-end">
          <SearchSort
            sortState={sortState}
            setSortState={setSortState}
            />
        </div>
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
            className="btn btn-outline btn-block btn-disabled">
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
