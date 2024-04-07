import { Customer } from 'lib/shopify/types'
import React from 'react'

export default function InfoCard({customer}: {customer: Customer}) {
  return (
    <div className='card bg-base-100'>
      <div className='card-body px-0'>
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
