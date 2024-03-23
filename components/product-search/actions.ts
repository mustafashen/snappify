'use server'

import { searchProducts } from "lib/shopify"

export async function getMoreProducts({
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