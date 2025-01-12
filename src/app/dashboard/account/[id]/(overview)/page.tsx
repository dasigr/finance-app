import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/account/breadcrumbs';
import Pagination from '@/app/ui/expenses/pagination';
import Table from '@/app/ui/expenses/table';
import { UpdateAccount } from '@/app/ui/account/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchExpensesPages } from '@/app/lib/data';
import { fetchAccountById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { fetchTotalAccountBalance } from '@/app/lib/actions/account';

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

  const totalAccountBalance = await fetchTotalAccountBalance();

  return (
    <div className="w-full pb-8 mb-8">
      <div className="flex items-center justify-between gap-2 mb-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Account', href: '/dashboard/account' },
            {
              label: `${account.name}`,
              href: `/dashboard/account/${id}/`,
              active: true,
            },
          ]}
        />
        <div>{totalAccountBalance}</div>
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
