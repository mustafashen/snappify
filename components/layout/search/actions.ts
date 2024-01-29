'use server'

import { searchProducts } from "lib/shopify"

export const quickProductQuery = async ({query}: {query: string}) => {
  if (query.length === 0) {
    return []
  }

  const products = await searchProducts({query, first: 5})
  return products

}