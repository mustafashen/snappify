import { customerAccessTokenFragment } from "../fragments/customer";

export const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        ...customerAccessToken
      }
    }
  }
  ${customerAccessTokenFragment}
`