import { 
	customerFragment } from "../fragments/customer";
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
						id
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
		}
	}
`
export const getCustomerOrdersQuery = `
	query getCustomerOrders($customerAccessToken: String!, $first: Int){
		customer(customerAccessToken: $customerAccessToken) {
			orders(first: $first) {
				edges {
					node {
						...order
					}
				}
			}
		}
	}
	${customerOrderFragment}
`