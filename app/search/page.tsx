import { searchProducts } from "lib/shopify";
import { defaultSort, searchSorting } from 'lib/constants';
import ProductsSearch from "components/product-search";

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
      <ProductsSearch products={products} searchValue={searchValue}/>
    </div>
  )
}
