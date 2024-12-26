import { Metadata } from 'next';
import Pagination from '@/app/ui/budget/pagination';
import Table from '@/app/ui/budget/table';
import { CreateBudget } from '@/app/ui/budget/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchBudgetPages } from '@/app/lib/data';
 
export const metadata: Metadata = {
  title: 'Budget',
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

  const totalPages = await fetchBudgetPages(query);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Budget</h1>
        <CreateBudget />
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
