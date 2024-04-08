'use client'
import { Menu } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { getCustomerAccessToken, logoutCustomer } from '../actions'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function UserAction() {

  const [loggedInCustomer, setLoggedInCustomer] = useState(false)

  function checkLoggedInUser() {
    getCustomerAccessToken().then((response) => {
      if ('Error' in response) {
        setLoggedInCustomer(false)
      } else {
        setLoggedInCustomer(true)
      }
    })
  }

  useEffect(() => {
    checkLoggedInUser()
  }, [])

  const handleLogout = () => {
    logoutCustomer()
    setLoggedInCustomer(false)
  }

  return (
    <Menu as={'div'} className="dropdown dropdown-end">
      <Menu.Button 
        className='btn btn-ghost'
        onClick={() => checkLoggedInUser()}>
        <UserIcon className='w-5 h-5'/>
      </Menu.Button>
      <Menu.Items>
        {
          loggedInCustomer ? (
            <ul className='dropdown-content z-[1] menu bg-base-200'>
              <li>
                <Menu.Item>
                  <Link
                    href={'/account'}>
                    Account
                  </Link>
                </Menu.Item>
              </li>
              <li>
                <Menu.Item>
                  <button
                    onClick={handleLogout}>
                    Logout
                  </button>
                </Menu.Item>
              </li>
            </ul>
          ) : (
            <ul className='dropdown-content z-[1] menu bg-base-200'>
              <li>
                <Menu.Item>
                  <Link
                    href={'/access'}>
                    Login
                  </Link>
                </Menu.Item>
              </li>
            </ul>
          )
        }
      </Menu.Items>
    </Menu>
  )
}
