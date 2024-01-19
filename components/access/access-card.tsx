'use client'
import { Tab } from '@headlessui/react'
import LoginCard from 'components/access/login-card'
import RegisterCard from 'components/access/register-card'
import React from 'react'

export default function AccessCard() {
  return (
    <div>
      <Tab.Group>
        <Tab.List 
          className='tablist tabs-bordered' 
          aria-label='access cards'>
          <Tab value='login' className={`tab ui-selected:tab-active`}>
            Login
          </Tab>
          <Tab value='register' className={`tab ui-selected:tab-active`}>
            Register
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <LoginCard/>
          </Tab.Panel>
          <Tab.Panel>
            <RegisterCard/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
