import { Metadata } from 'next';
import Pagination from '@/app/ui/expenses/pagination';
import Table from '@/app/ui/expenses/table';
import { UpdateAccount } from '@/app/ui/account/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchExpensesPages } from '@/app/lib/data';
import { fetchAccountById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Account Expenses',
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const id = params.id;
  const [account] = await Promise.all([
    fetchAccountById(id),
  ]);

  if (!account) {
    notFound();
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchExpensesPages(query);

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>{account.name}</h1>
        <UpdateAccount id={account.id} />
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
