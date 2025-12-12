import Link from 'next/link'

export default function MainMenu() {
  return (
    <>
      <div className="space-y-2 py-6">
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
      </div>
      <div className="py-6 mb-12">
        <Link
          href="/dashboard/settings"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
        >
          Settings
        </Link>
        <Link
          href="/dashboard/settings/income-categories"
          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
        >
          Income Categories
        </Link>
        <Link
          href="/dashboard/settings/expense-categories"
          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
        >
          Expense Categories
        </Link>
      </div>
    </>
  )
}