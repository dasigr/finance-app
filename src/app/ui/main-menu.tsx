'use client'

import { useState } from 'react'
import Link from 'next/link'
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
        >
          Home
        </Link>
        <Link
          href="/dashboard/invoices"
        >
          Invoices
        </Link>
        <Link
          href="/dashboard"
        >
          Profile
        </Link>
      </div>
    </footer>
  )
}
