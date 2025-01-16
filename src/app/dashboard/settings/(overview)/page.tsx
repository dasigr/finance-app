import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { fetchExpenseCategoryPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Settings',
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

  const totalPages = await fetchExpenseCategoryPages(query);

  return (
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <div className="mt-5">
        <ul>
          <li>First day of the week</li>
          <li>Hide closed accounts</li>
          <li>Default account</li>
          <li>Currency</li>
          <li>Import / Export</li>
        </ul>
      </div>
    </div>
  );
}
