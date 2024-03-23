import productFragment from "../fragments/product";

export const productSearchQuery = /* GraphQL */ `
  query searchProducts($query: String!, $first: Int, $sortKey: SearchSortKeys, $reverse: Boolean, $after: String) {
    search(query: $query, first: $first, types: PRODUCT, sortKey: $sortKey, reverse: $reverse, after: $after) {
      edges {
        cursor
        node {
          ...product
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${productFragment}
`
