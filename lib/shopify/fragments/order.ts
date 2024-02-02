import { customerAddressFragment } from "./customer";

const moneyV2Fragment = /* GraphQL */ `
    fragment moneyV2 on MoneyV2 {
        amount
        currencyCode
    }
`

const discountApplicationFragment = `
    fragment discountApplication on DiscountApplication {
        allocationMethod
        targetSelection
        targetType
        value
    }
`
const customerOrderFragment = /* GraphQL */ `
    fragment order on Order {
        billingAddress {
            ...customerAddress
        }
        cancelReason
        canceledAt
        currencyCode
        currentSubtotalPrice {
            ...moneyV2
        }
        currentTotalDuties {
            ...moneyV2
        }
        currentTotalPrice {
            ...moneyV2
        }
        currentTotalTax {
            ...moneyV2
        }
        customerLocale
        customerUrl
        edited
        email
        financialStatus
        fulfillmentStatus
        id
        name
        orderNumber
        originalTotalDuties {
            ...moneyV2
        }
        originalTotalPrice {
            ...moneyV2
        }
        phone
        processedAt
        shippingAddress {
            ...customerAddress
        }
        shippingDiscountAllocations {
            allocatedAmount {
                ...moneyV2
            }
            ...discountApplication
        }
        statusUrl
        subtotalPrices
        successfulFulfillments
        totalPrice {
            ...moneyV2
        }
        totalRefunded {
            ...moneyV2
        }
        totalShippingPrice {
            ...moneyV2
        }
        totalTax {
            ...moneyV2
        }
    }
    ${customerAddressFragment}
    ${moneyV2Fragment}
    ${discountApplicationFragment}
`;

export {
    customerOrderFragment
}