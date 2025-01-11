import { Metadata } from 'next';
import Pagination from '@/app/ui/expenses/pagination';
import Table from '@/app/ui/expenses/table';
import { CreateExpense } from '@/app/ui/expenses/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchExpensesPages } from '@/app/lib/data';
import { fetchTotalExpenseAmount } from '@/app/lib/actions/expense';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Expenses',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchExpensesPages(query);

  const totalExpenseAmount = await fetchTotalExpenseAmount();

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Expenses</h1>
        <div>{totalExpenseAmount}</div>
        <CreateExpense />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table destination="/dashboard/account/[id]/" query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
