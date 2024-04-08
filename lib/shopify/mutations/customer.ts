import { 
	customerAccessTokenFragment, 
	customerFragment } from "../fragments/customer";

export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        ...customer
      }
    }
  }
  ${customerFragment}
`

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

export const customerAccessTokenDeleteMutation = /* GraphQL */ `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
			deletedAccessToken
    }
  }
`

export const customerActivateMutation = /* GraphQL */ `
	mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
		customerActivateByUrl(activationUrl: $activationUrl, password: $password) {
			customer {
				...customer
			}
			customerAccessToken {
				...customerAccessToken
			}
		}
	}
	${customerFragment}
	${customerAccessTokenFragment}
`

export const customerRecoverMutation = /* GraphQL */ `
	mutation customerRecover($email: String!) {
		customerRecover(email: $email) {
			customerUserErrors {
				code
			}
		}
	}
`

export const customerResetMutation = /* GraphQL */ `
	mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
		customerResetByUrl(password: $password, resetUrl: $resetUrl) {
			customer {
				...customer
			}
			customerAccessToken {
				...customerAccessToken
			}
		}
	}
	${customerFragment}
	${customerAccessTokenFragment}
`

export const customerUpdateMutation = /* GraphQL */ `
	mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
		customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
			customer {
				...customer
			}
			customerAccessToken {
				...customerAccessToken
			}
		}
	}
	${customerFragment}
	${customerAccessTokenFragment}
`	

export const customerAddressCreateMutation = /* GraphQL */ `
	mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
		customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
			customerAddress {
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
		}
	}
`

export const customerAddressDeleteMutation = /* GraphQL */ `
	mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
		customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
			deletedCustomerAddressId
		}
	}
`

export const customerAddressUpdateMutation = /* GraphQL */ `
	mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
		customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
			customerAddress {
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
		}
	}
`
export const customerAddressUpdateDefaultMutation = /* GraphQL */ `
	mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
		customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
			customer {
				...customer
			}
		}
	}
	${customerFragment}
`