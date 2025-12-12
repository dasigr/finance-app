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
} from '@heroicons/react/24/outline'
import MainMenu from '@/app/components/main-menu'
import UserMenu from '@/app/components/user-menu'
import Branding from '@/app/components/branding'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white sm:block">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-2 px-6 lg:px-8">
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="flex lg:flex-1">
          <Branding />
        </div>
        <div className="flex justify-center gap-6 lg:hidden">
          <UserMenu />
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
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
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
            <Branding />
            <div className="flex justify-center gap-6">
              <UserMenu />
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 pb-4">
              <div className="space-y-2 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <Image
                        src="/customers/amy-burns.png"
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt="Amy Burns"
                      />
                      <Link href="/profile">
                        <p>Amy Burns</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <MainMenu />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
