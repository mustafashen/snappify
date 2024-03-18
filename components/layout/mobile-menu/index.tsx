'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import LogoIcon from 'components/icons/logo'
import MobileMenuItems from './mobile-menu-items'
import { Blog, Menu } from 'lib/shopify/types'

export default function MobileMenu({menu, blogs}: {menu: Menu[], blogs: Blog[]}) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost xl:hidden"
        >
          <Bars3Icon className='w-5 h-5'/>
        </button>
      </div>
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}>
        <Dialog.Panel className='fixed top-0 left-0 h-full w-full flex flex-col card card-bordered shadow-xl bg-base-200 sm:w-1/2 z-10'>
          <div className='navbar justify-between mb-4'>
            <Dialog.Title className='text-2xl card-title'>
              {/* <LogoIcon/> */}
            </Dialog.Title>
            <button 
              onClick={() => setIsOpen(false)}
              className='btn btn-ghost self-end'>
              <XMarkIcon className='w-5 h-5'/>
            </button>
          </div>
          <MobileMenuItems menu={menu} blogs={blogs}/>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
