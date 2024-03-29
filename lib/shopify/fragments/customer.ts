
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

const customerAddressFragment = /* GraphQL */`
  fragment customerAddress on CustomerAddress {
    address1 
    address2 
    city 
    company 
    country 
    firstName 
    lastName 
    phone 
    province 
    zip 
  }
`
export {
  customerFragment,
  customerAccessTokenFragment,
  customerAddressFragment,
}