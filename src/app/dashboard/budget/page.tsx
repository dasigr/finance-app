import { Metadata } from 'next';
import Pagination from '@/app/ui/budget/pagination';
import Table from '@/app/ui/budget/table';
import { formatCurrency } from '@/app/lib/utils';
import { CreateBudget } from '@/app/ui/budget/buttons';
import { lusitana } from '@/app/ui/fonts';
import { BudgetTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchBudgetPages } from '@/app/lib/data';
import { fetchTotalBudgetAmount } from '@/app/lib/actions/budget';
import { BudgetStatus } from '@/app/ui/budget/budget-status';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Budget',
};

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchBudgetPages(query);

  const totalBudgetAmount = await fetchTotalBudgetAmount();

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Budget</h1>
        <div>{formatCurrency(totalBudgetAmount)}</div>
        <CreateBudget />
      </div>
      <div className="mt-4">
        <BudgetStatus budgetAmount={totalBudgetAmount} />
      </div>
      <Suspense key={query + currentPage} fallback={<BudgetTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
