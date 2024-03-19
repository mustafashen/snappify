'use client'
import { Tab } from '@headlessui/react'
import { Customer } from 'lib/shopify/types'
import React from 'react'
import EditCard from './edit-card'
import InfoCard from './info-card'
import CustomerAddresses from './customer-addresses'
import CustomerOrders from './customer-orders'

export default function CustomerCard({customer}: {customer: Customer}) {
  return (
    <div className='pt-16 overflow-visible flex justify-center items-center'>
      <div className='card card-bordered w-96'>
        <Tab.Group>
          <Tab.List 
            className='tabs tabs-boxed flex justify-center *:flex-grow'>
            <Tab value='info' className={`tab ui-selected:tab-active`}>
              Info
            </Tab>
            <Tab value='edit' className={`tab ui-selected:tab-active`}>
              Orders
            </Tab>
            <Tab value='addresses' className={`tab ui-selected:tab-active`}>
              Addresses
            </Tab>
            <Tab value='edit' className={`tab ui-selected:tab-active`}>
              Edit
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <InfoCard customer={customer}/>
            </Tab.Panel>
            <Tab.Panel>
              <CustomerOrders/>
            </Tab.Panel>
            <Tab.Panel>
              <CustomerAddresses/>
            </Tab.Panel>
            <Tab.Panel>
              <EditCard customer={customer}/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
