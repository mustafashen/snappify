
const customerFragment = /* GraphQL */`
  fragment customer on Customer {
    firstName
    lastName
    email
    phone
    acceptsMarketing
  }
`

const customerAccessTokenFragment = /* GraphQL */`
  fragment customerAccessToken on CustomerAccessToken {
    accessToken
  }
`

export {
  customerFragment,
  customerAccessTokenFragment
}