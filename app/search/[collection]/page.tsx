import CollectionProducts from "components/products-list/collection-products";
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
      <CollectionProducts
        collection={params.collection}
        title={title}
        products={products.productList}
        pageInfo={products.pageInfo}
      />
    </div>
  )
}
