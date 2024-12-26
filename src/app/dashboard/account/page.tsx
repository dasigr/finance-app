import { Metadata } from 'next';
import Pagination from '@/app/ui/income/pagination';
import Table from '@/app/ui/income/table';
import { CreateInvoice } from '@/app/ui/income/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAccountPages } from '@/app/lib/data';
 
export const metadata: Metadata = {
  title: 'Account',
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

  const totalPages = await fetchAccountPages(query);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Account</h1>
        <CreateInvoice />
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
