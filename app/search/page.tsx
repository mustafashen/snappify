import Grid from "components/grid"
import { searchProducts } from "lib/shopify";
import { defaultSort, searchSorting } from 'lib/constants';
import SearchSort from "components/search/search-sort";

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
}

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = searchSorting.find((item) => item.slug === sort) || defaultSort;

  const products = await searchProducts({ sortKey, reverse, query: searchValue })
  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          Results for &quot;{searchValue}&quot;
        </h1>
        <SearchSort/>
      </div>
      <Grid products={products}></Grid>
    </div>
  )
}
