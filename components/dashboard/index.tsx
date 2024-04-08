import React from 'react'
import { customerGet } from './actions'
import CustomerCard from './customer-card'
import { redirect } from 'next/navigation'

export default async function Dashboard() {

    const customer = await customerGet()
    if ('Error' in customer) redirect('/')
    return (
      <div>
        <CustomerCard customer={customer}/>
      </div>
    )

}
