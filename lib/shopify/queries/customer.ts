import { customerAddressFragment, customerFragment } from "../fragments/customer";
import {customerOrderFragment} from "../fragments/order";

export const getCustomerQuery = `
	query getCustomer($customerAccessToken: String!){
		customer(customerAccessToken: $customerAccessToken) {
			...customer
		}
	}
	${customerFragment}
`

export const getCustomerAddressQuery = `
	query getCustomerAddress($customerAccessToken: String!, $first: Int){
		customer(customerAccessToken: $customerAccessToken) {
			addresses(first: $first) {
				edges {
					node {
						...customerAddress
                }
            }
		}
	}
	${customerAddressFragment}
`
export const getCustomerOrdersQuery = `
	query getCustomerAddress($customerAccessToken: String!, $first: Int){
		customer(customerAccessToken: $customerAccessToken) {
			orders(first: $first) {
				edges {
					node {
						...customerOrder
                }
            }
		}
	}
	${customerOrderFragment}
`