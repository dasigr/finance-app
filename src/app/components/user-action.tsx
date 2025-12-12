'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HomeIcon, PlusIcon, WalletIcon, ChartPieIcon, ArrowsRightLeftIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function UserAction() {
  return (
    <footer className="bg-white lg:hidden">
      <div className="fixed bottom-0 w-full bg-white bg-opacity-90 border-t text-grey-700 flex justify-around py-4 shadow-lg z-50">
        <Link
          href="/dashboard"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Dashboard</span>{' '}
          <HomeIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/dashboard/income/create"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Add Income</span>{' '}
          <WalletIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/dashboard/expenses/create"
          className="flex h-8 items-center rounded-2xl px-1 bg-gray-500 font-medium text-white border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Add Expense</span>{' '}
          <PlusIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/dashboard/account/transfer"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Transfer</span>{' '}
          <ArrowsRightLeftIcon className="h-6 md:ml-4" />
        </Link>
        <Link
          href="/dashboard/reports"
          className="flex h-8 items-center rounded-lg px-2 font-medium text-grey-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Reports</span>{' '}
          <ChartPieIcon className="h-6 md:ml-4" />
        </Link>
      </div>
    </footer>
  )
}
