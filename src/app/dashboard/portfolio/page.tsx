import { Metadata } from 'next';
import Pagination from '@/app/components/portfolio/pagination';
import Table from '@/app/components/portfolio/table';
import { formatCurrency } from '@/app/lib/utils';
import { CreatePortfolio } from '@/app/components/portfolio/buttons';
import { lusitana } from '@/app/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { fetchPortfolioPages } from '@/app/lib/data';
import { fetchTotalPorftfolioAmount } from '@/app/lib/actions/portfolio';
import { StockDaily } from '@/app/components/stocks/time-series-daily';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Portfolio',
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

  const totalPages = await fetchPortfolioPages(query);

  const totalPortfolioAmount = await fetchTotalPorftfolioAmount();

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className={`${lusitana.className} text-2xl`}>Portfolio</h1>
        <div>{formatCurrency(totalPortfolioAmount)}</div>
        <CreatePortfolio />
      </div>
      <div className="mb-4 pt-2">
        <StockDaily />
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
