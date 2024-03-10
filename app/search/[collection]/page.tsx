import Grid from "components/grid";
import CollectionSort from "components/search/collection-sort";
import { defaultSort, sorting } from "lib/constants";
import { getCollection, getCollectionProducts } from "lib/shopify"
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function page({
  searchParams, params}: {
    searchParams: {[key: string]: string} | string[] | undefined, 
    params: {collection: string}
  }) {

  const { sort, title } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  return (
    <div>
      <div className="p-5 flex justify-between items-center">
        <h1
          className="text-xl font-semibold">
          {title}
        </h1>
        <CollectionSort/>
      </div>
      <Grid products={products}></Grid>
    </div>
  )
}
