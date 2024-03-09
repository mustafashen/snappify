import Grid from "components/grid"
import { searchProducts } from "lib/shopify";
import { defaultSort, sorting } from 'lib/constants';

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
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await searchProducts({ sortKey, reverse, query: searchValue })
  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          Results for &quot;{searchValue}&quot;
        </h1>
        <select className="select select-bordered select-sm w-full max-w-xs">
          {
            sorting.map((item) => (
              <option key={item.sortKey}>{item.title}</option>
            ))
          }
        </select>
      </div>
      <Grid products={products}></Grid>
    </div>
  )
}
