'use server'

import { getCollectionProducts, searchProducts } from "lib/shopify"

export async function getMoreSearchProducts({
  cursor, 
  query, 
  sortKey, 
  reverse
}: {
  cursor?: string, 
  query?: string, 
  sortKey: 'RELEVANCE' | 'PRICE', 
  reverse: boolean
}) {
  
  return await searchProducts({query, sortKey, reverse, after: cursor})

}

export async function getMoreCollectionProducts({
  cursor, 
  collection, 
  sortKey, 
  reverse
}: {
  cursor?: string, 
  collection: string, 
  sortKey: string, 
  reverse: boolean
}) {
  
  return await getCollectionProducts({collection, sortKey, reverse, after: cursor})

}
