import productFragment from "../fragments/product";

export const productSearchQuery = /* GraphQL */ `
  query searchProducts($query: String!, $first: Int, $sortKey: SearchSortKeys, $reverse: Boolean) {
    search(query: $query, first: $first, types: PRODUCT, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`
