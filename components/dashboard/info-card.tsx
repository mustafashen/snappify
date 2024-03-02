import { Customer } from 'lib/shopify/types'
import React from 'react'

export default function InfoCard({customer}: {customer: Customer}) {
  return (
    <div className='card'>
        <ul className='card-body'>
          <li>First name: {customer.firstName}</li>
          <li>Last name: {customer.lastName}</li>
          <li>Email: {customer.email}</li>
          <li>Phone: {customer.phone}</li>
        </ul>
    </div>
  )
}
