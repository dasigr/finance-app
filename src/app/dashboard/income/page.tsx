import { Metadata } from 'next';
import Pagination from '@/app/ui/income/pagination';
import Table from '@/app/ui/income/table';
import { CreateIncome } from '@/app/ui/income/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchIncomesPages } from '@/app/lib/data';
import { fetchTotalIncomeAmount } from '@/app/lib/actions/income';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Income',
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

  const totalPages = await fetchIncomesPages(query);

  const totalIncomeAmount = await fetchTotalIncomeAmount();

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Income</h1>
        <div>{totalIncomeAmount}</div>
        <CreateIncome />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
