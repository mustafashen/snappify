import { customerAddressFragment } from "./customer";

const moneyV2Fragment = /* GraphQL */ `
    fragment moneyV2 on MoneyV2 {
        amount
        currencyCode
    }
`
const customerOrderFragment = /* GraphQL */ `
    fragment order on Order {
        billingAddress {
            ...mailingAddress
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
            ...mailingAddress
        }
        statusUrl
        subtotalPrice {
            ...moneyV2
        }
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
`;

export {
    customerOrderFragment
}