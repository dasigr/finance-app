import { Metadata } from 'next';
import Pagination from '@/app/ui/account/pagination';
import Table from '@/app/ui/account/table';
import { CreateAccount, TransferAccountBalance } from '@/app/ui/account/buttons';
import { lusitana } from '@/app/ui/fonts';
import { AccountTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAccountPages } from '@/app/lib/data';
import { fetchTotalAccountBalance } from '@/app/lib/actions/account';
 
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

  const totalAccountBalance = await fetchTotalAccountBalance();

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Account</h1>
        <div>{totalAccountBalance}</div>
        <div className="flex justify-between gap-2">
          <CreateAccount />
          <TransferAccountBalance />
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<AccountTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
