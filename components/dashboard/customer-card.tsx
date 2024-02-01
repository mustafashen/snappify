'use client'
import { Tab } from '@headlessui/react'
import { Customer } from 'lib/shopify/types'
import React from 'react'
import EditCard from './edit-card'
import InfoCard from './info-card'

export default function CustomerCard({customer}: {customer: Customer}) {
  return (
  <div className='card card-bordered shadow-xl'>
    <Tab.Group>
      <Tab.List 
        className='tablist tabs-bordered'>
        <Tab value='info' className={`tab ui-selected:tab-active`}>
          Info
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
          <EditCard customer={customer}/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </div>
  )
}
