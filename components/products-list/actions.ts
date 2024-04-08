'use server'

import { getCollectionProducts, searchProducts } from "lib/shopify"

export async function getNewSearchProducts({
  query, 
  sortKey, 
  reverse
}: {
  query?: string, 
  sortKey: 'RELEVANCE' | 'PRICE', 
  reverse: boolean
}) {
  
  try {
    return await searchProducts({query, sortKey, reverse})
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }

}

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
  
  try {
    return await searchProducts({query, sortKey, reverse, after: cursor})
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }

}

export async function getNewCollectionProducts({ 
  collection, 
  sortKey, 
  reverse
}: {
  collection: string, 
  sortKey: string, 
  reverse: boolean
}) {
  try {
    return await getCollectionProducts({collection, sortKey, reverse})
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
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
  
  try {
    return await getCollectionProducts({collection, sortKey, reverse, after: cursor})
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }

}
