'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HomeIcon, PlusIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function MainMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <footer className="bg-white lg:hidden">
      <div className="fixed bottom-0 w-full bg-white bg-opacity-90 border-t text-grey-700 flex justify-around py-4 shadow-lg z-50">
        <Link
          href="/dashboard"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Home</span>{' '}
          <HomeIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/settings"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Settings</span>{' '}
          <CogIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/dashboard/expenses/create"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Add Expense</span>{' '}
          <PlusIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/settings"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Settings</span>{' '}
          <CogIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/dashboard/profile"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Profile</span>{' '}
          <UserIcon className="h-6 md:ml-4" />
        </Link>
      </div>
    </footer>
  )
}
