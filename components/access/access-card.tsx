'use client'
import { Tab } from '@headlessui/react'
import LoginCard from 'components/access/login-card'
import RegisterCard from 'components/access/register-card'
import React, { useState } from 'react'
import RecoverCard from './recover-card'

export default function AccessCard() {
  const [recoverView, setRecoverView] = useState(false)
  return (
    <div>
      <Tab.Group>
        <Tab.List 
          className='tablist tabs-bordered'>
          <Tab value='login' className={`tab ui-selected:tab-active`}>
            Login
          </Tab>
          <Tab value='register' className={`tab ui-selected:tab-active`}>
            Register
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {
              recoverView ? (
                <RecoverCard/>
              ) : ( 
                <LoginCard/>
              )
            }
          </Tab.Panel>
          <Tab.Panel>
            <RegisterCard/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
