'use client'
import * as Tabs from '@radix-ui/react-tabs';
import LoginCard from 'components/access/login-card'
import RegisterCard from 'components/access/register-card'
import React from 'react'

export default function AccessCard() {
  return (
    <div>
      <Tabs.Root
        defaultValue={'login'}>
        <Tabs.List 
          className='tablist tabs-bordered' 
          aria-label='access cards'>
          <Tabs.Trigger value='login' className={`tab data-[state='active']:tab-active`}>
            Login
          </Tabs.Trigger>
          <Tabs.Trigger value='register' className={`tab data-[state='active']:tab-active`}>
            Register
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='login'>
          <LoginCard/>
        </Tabs.Content>
        <Tabs.Content value='register'>
          <RegisterCard/>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
