import React from 'react'
import { customerGet } from './actions'
import CustomerCard from './customer-card'

export default async function Dashboard() {

  const customer = await customerGet()
  
  return (
    <div>
      {
        typeof customer === 'object' ? 
          <CustomerCard customer={customer}/> :
          <p>customer</p>
      }
    </div>
  )
}
