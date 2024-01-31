import { customerFragment } from "../fragments/customer";

export const getCustomerQuery = `
	query {
		customer($customerAccessToken: !String) {
			...customer
		}
	}
	${customerFragment}
`