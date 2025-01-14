'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  BellIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import LogoutForm from '@/app/ui/logout-form'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white sm:block">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8">
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 mr-10"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="flex lg:flex-1">
          <Link 
            href="/"
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">Finance</span>
            <Image
              src="/logo.png"
              alt="Personal Finance"
              width={40}
              height={40}
              priority={false}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="flex justify-center gap-6 lg:hidden">
          <BellIcon aria-hidden="true" className="size-6" />
          <ArrowRightStartOnRectangleIcon aria-hidden="true" className="size-6" />
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/dashboard"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/income"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Income
          </Link>
          <Link
            href="/dashboard/expenses"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Expenses
          </Link>
          <Link
            href="/dashboard/account"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Account
          </Link>
          <Link
            href="/dashboard/budget"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Budget
          </Link>
          <Link
            href="/settings"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Settings
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/login"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 mr-10"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Finance</span>
              <Image
                src="/logo.png"
                alt="Personal Finance"
                width={40}
                height={40}
                priority={false}
                className="h-10 w-auto"
              />
            </Link>
            <div className="flex justify-center gap-6">
              <BellIcon aria-hidden="true" className="size-6" />
              <ArrowRightStartOnRectangleIcon  aria-hidden="true" className="size-6" />
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/dashboard"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/income"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Income
                </Link>
                <Link
                  href="/dashboard/expenses"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Expenses
                </Link>
                <Link
                  href="/dashboard/account"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Account
                </Link>
                <Link
                  href="/dashboard/budget"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Budget
                </Link>
                <Link
                  href="/settings"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Settings
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/dashboard/profile"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  href="/logout"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
