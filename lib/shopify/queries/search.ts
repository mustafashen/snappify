import productFragment from "../fragments/product";

export const productSearchQuery = /* GraphQL */ `
  query searchProducts($query: String!, $first: Int, $sortKey: SearchSortKeys, $reverse: Boolean) {
    search(query: $query, first: $first, types: PRODUCT) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`
