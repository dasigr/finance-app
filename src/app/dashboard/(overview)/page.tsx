import { signOut } from '@/auth';
import { Metadata } from 'next';
import { PowerIcon } from '@heroicons/react/24/outline';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import {
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { formatCurrency } from '@/app/lib/utils';
import { BudgetStatus } from '@/app/ui/budget/budget-status';
import { fetchTotalBudgetAmount } from '@/app/lib/actions/budget';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const totalBudgetAmount = await fetchTotalBudgetAmount();

  return (
    <div className="pb-4 mb-12">
      <div>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
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
  );
}
