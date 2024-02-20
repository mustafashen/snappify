'use client'
import { Menu } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { logoutCustomer } from '../actions'
import Link from 'next/link'

export default function UserAction() {

  const handleLogout = () => {
    logoutCustomer()
  }

  return (
    <Menu as={'div'} className="dropdown dropdown-end">
      <Menu.Button className='btn btn-ghost'>
        <UserIcon className='w-5 h-5'/>
      </Menu.Button>
      <Menu.Items>
        <ul className='dropdown-content z-[1] menu bg-base-200'>
          <li>
            <Menu.Item>
              <Link
                href={'/dashboard'}>
                Dashboard
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
      </Menu.Items>
    </Menu>
  )
}
