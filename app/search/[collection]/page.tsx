import Grid from "components/grid";
import { defaultSort, sorting } from "lib/constants";
import { getCollectionProducts } from "lib/shopify"


// TODO: Add metadata
export default async function page({
  searchParams, params}: {
    searchParams: {[key: string]: string} | string[] | undefined, 
    params: {collection: string}
  }) {

  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  return (
    <section>
      <Grid products={products}/>
    </section>
  )
}
