import React from 'react'
import { customerGet } from './actions'
import CustomerCard from './customer-card'
import { redirect } from 'next/navigation'

export default async function Dashboard() {

  try {
    const customer = await customerGet()

    return (
      <div>
        <CustomerCard customer={customer}/>
      </div>
    )

  } catch (error) {
    redirect('/')
  }

}
