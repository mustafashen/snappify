'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import MobileMenuItems from './mobile-menu-items'
import { Blog, Collection, Menu } from 'lib/shopify/types'
import LogoIcon from 'components/icons/logo'

export default function MobileDrawer({
  menu, 
  blogs,
  collections
  }: {
    menu: Menu[], 
    blogs: Blog[]
    collections: Collection[]
  }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn-ghost xl:hidden">
        <Bars3Icon className='w-5 h-5'/>
      </button>
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}>
        <Dialog.Panel className='fixed top-0 left-0 h-full w-full flex flex-col card card-bordered shadow-xl bg-base-100 sm:w-1/2 z-10 animate-fade-right'>
          <div className='navbar justify-between mb-4'>
            <Dialog.Title className='flex items-center'>
              <LogoIcon/>
            </Dialog.Title>
            <button 
              onClick={() => setIsOpen(false)}
              className='btn btn-ghost self-end'>
              <XMarkIcon className='w-5 h-5'/>
            </button>
          </div>
          <MobileMenuItems menu={menu} blogs={blogs} collections={collections}/>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
