
const ShopPolicyFragment = /* GraphQL */`
  fragment shopPolicy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
`

const ShopPolicyWithDefaultFragment = /* GraphQL */`
  fragment shopPolicyWithDefault on ShopPolicyWithDefault {
    body
    handle
    id
    title
    url
  }
`

export {
  ShopPolicyFragment,
  ShopPolicyWithDefaultFragment
}