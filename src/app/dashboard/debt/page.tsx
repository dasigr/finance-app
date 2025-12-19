import { Metadata } from 'next';
import Pagination from '@/app/components/debt/pagination';
import Table from '@/app/components/debt/table';
import { formatCurrency } from '@/app/lib/utils';
import { CreateExpense } from '@/app/components/debt/buttons';
import { lusitana } from '@/app/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { fetchDebtPages } from '@/app/lib/data';
import { fetchTotalDebtAmount } from '@/app/lib/actions/debt';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Debt',
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

  const totalPages = await fetchDebtPages(query);

  const totalExpenseAmount = await fetchTotalDebtAmount();

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Debt</h1>
        <div>{formatCurrency(totalExpenseAmount)}</div>
        <CreateExpense />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
