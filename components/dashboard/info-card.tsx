import { Customer } from 'lib/shopify/types'
import React from 'react'

export default function InfoCard({customer}: {customer: Customer}) {
  return (
    <div className='card'>
      <div className='card-body'>
        <h1 className='card-title'>User info</h1>
        <ul>
          <li>First name: {customer.firstName}</li>
          <li>Last name: {customer.lastName}</li>
          <li>Email: {customer.email}</li>
          <li>Phone: {customer.phone}</li>
        </ul>
      </div>
    </div>
  )
}
