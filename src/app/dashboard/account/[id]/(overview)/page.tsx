import { Metadata } from 'next';
import Breadcrumbs from '@/app/components/account/breadcrumbs';
import Pagination from '@/app/components/account/pagination';
import TransactionsTable from '@/app/components/transaction/table';
import { UpdateAccount } from '@/app/components/account/buttons';
import { lusitana } from '@/app/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { fetchAccountTransactionsPages } from '@/app/lib/data';
import { fetchAccountById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { fetchAccountBalance } from '@/app/lib/actions/account';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Account Expenses',
};

export default async function Page(
  props: {
    params: Promise<{ id: string }>,
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id = params.id;
  const [account] = await Promise.all([
    fetchAccountById(id),
  ]);

  if (!account) {
    notFound();
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchAccountTransactionsPages(account.id);

  const accountBalance = await fetchAccountBalance(account.id);

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
        <div>{accountBalance}</div>
        <UpdateAccount id={account.id} />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <TransactionsTable currentPage={currentPage} account_id={account.id} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
