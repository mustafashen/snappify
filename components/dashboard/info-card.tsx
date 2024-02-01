import { Customer } from 'lib/shopify/types'
import React from 'react'

export default function InfoCard({customer}: {customer: Customer}) {
  return (
    <div>
        <ul>
          <li>{customer.firstName}</li>
          <li>{customer.lastName}</li>
          <li>{customer.email}</li>
          <li>{customer.phone}</li>
          <li>{customer.acceptsMarketing}</li>
        </ul>
    </div>
  )
}
