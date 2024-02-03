'use client'
import { Menu } from '@headlessui/react'
import { User } from 'react-feather'
import { logoutCustomer } from '../actions'
import Link from 'next/link'
export default function UserAction() {

  const handleLogout = () => {
    logoutCustomer()
  }

  return (
    <Menu as={'div'} className="dropdown dropdown-end">
      <Menu.Button className='btn btn-ghost'>
        <User/>
      </Menu.Button>
      <Menu.Items>
        <ul className='dropdown-content z-[1] menu'>
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
