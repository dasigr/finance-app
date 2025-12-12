import { Metadata } from 'next';
import { lusitana } from '@/app/fonts';
import { CreateCategory } from '@/app/components/income-category/buttons';
import { Suspense } from 'react';
import Table from '@/app/components/income-category/table';
import Pagination from '@/app/components/income-category/pagination';
import Search from '@/app/components/search';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { fetchIncomeCategoryPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Income Category',
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

  const totalPages = await fetchIncomeCategoryPages(query);

  return (
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Income Category</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search category" />
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
