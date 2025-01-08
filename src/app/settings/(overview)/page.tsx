import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
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
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <div className="mt-5 flex w-full justify-center gap-2">
        <Link
          href="/settings/income-category"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Income Category
        </Link>
        <Link
          href="/settings/expense-category"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Expense Category
        </Link>
      </div>
    </div>
  );
}
