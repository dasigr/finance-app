import { Metadata } from 'next'
import CardWrapper from '@/app/ui/dashboard/cards'
import { Suspense } from 'react'
import {
  CardsSkeleton,
} from '@/app/ui/skeletons'
import { formatCurrency } from '@/app/lib/utils'
import { BudgetStatus } from '@/app/ui/budget/budget-status'
import { fetchTotalBudgetAmount } from '@/app/lib/actions/budget'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const totalBudgetAmount = await fetchTotalBudgetAmount();

  return (
    <div className="pb-4 mb-12">
      <div className="mt-4 mb-4">
        <p className="mb-4">Budget: {formatCurrency(totalBudgetAmount)}</p>
        <BudgetStatus budgetAmount={totalBudgetAmount} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </div>
  )
}
