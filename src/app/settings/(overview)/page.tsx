import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { CreateCategory } from '@/app/ui/expense-category/buttons';
import { Suspense } from 'react';
import Table from '@/app/ui/expense-category/table';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchExpenseCategoryPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Settings',
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

  const totalPages = await fetchExpenseCategoryPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search settings..." />
        <CreateCategory />
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
