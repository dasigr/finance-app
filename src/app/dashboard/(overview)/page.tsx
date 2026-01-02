import { Metadata } from 'next'
import CardWrapper from '@/app/components/dashboard/cards'
import { Suspense } from 'react'
import {
  CardsSkeleton,
} from '@/app/components/skeletons'
import { formatCurrency } from '@/app/lib/utils'
import { BudgetStatus } from '@/app/components/budget/budget-status'
import { fetchTotalBudgetAmount } from '@/app/lib/actions/budget'

import { ExampleChart } from '@/app/components/example-chart'
import { StockDaily } from '@/app/components/stocks/time-series-daily'

import Link from 'next/link'
import { TrophyIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/fonts'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const totalBudgetAmount = await fetchTotalBudgetAmount()
  const goals:any = [
    {
      id: '',
      name: 'Retirement',
      amount: '1500000000',
      status: 'In Progress'
    },
    {
      id: '1',
      name: 'Emergency Fund',
      amount: '30000000',
      status: 'In Progress'
    },
    {
      id: '2',
      name: 'Debt',
      amount: '0',
      status: 'In Progress'
    },
    {
      id: '3',
      name: 'Car (Minivan)',
      amount: '24000000',
      status: 'To Do'
    },
    {
      id: '4',
      name: 'House and Lot',
      amount: '190000000',
      status: 'Completed'
    },
    {
      id: '5',
      name: 'Motorcycle (XRM 125)',
      amount: '8390000',
      status: 'Completed'
    }
  ]

  return (
    <div className="pb-4 mb-12">
      <div className="mb-4 pt-2">
        <StockDaily />
      </div>
      <div className="mb-4 pt-2">
        <ExampleChart />
      </div>
      <div className="mb-4 pt-2">
        <p className="mb-4">Budget: {formatCurrency(totalBudgetAmount)}</p>
        <BudgetStatus budgetAmount={totalBudgetAmount} />
      </div>
      <div className="mb-4 grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mb-4 grid gap-2 grid-cols-1">
        <div className={`rounded-xl p-1 shadow-sm bg-slate-400`}>
          <Link href={`/dashboard/goals`} className="">
            <div className="flex pt-2 px-2">
              <TrophyIcon className="h-5 w-5 text-white" />
              <h3 className="ml-2 text-sm text-white font-medium">Goals</h3>
            </div>
            <p className={`${lusitana.className} truncate rounded-xl px-2 py-2 text-xl text-white`}>
              ₱15,000,000.00
            </p>
            <table className="min-w-full bg-gray-200 md:table mb-2">
              <thead className="text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="p-2 font-bold sm:pl-6">
                    Goal
                  </th>
                  <th scope="col" className="p-2 font-bold">
                    Amount
                  </th>
                  <th scope="col" className="p-2 font-bold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {goals?.map((goal: any) => (
                  <tr 
                    key={goal.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap p-2">
                      {goal.name}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {formatCurrency(goal.amount)}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {goal.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Link>
        </div>
      </div>
    </div>
  )
}
