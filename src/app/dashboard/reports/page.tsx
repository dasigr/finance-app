import { Metadata } from "next";
import { lusitana } from '@/app/ui/fonts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reports',
};

export default function Page() {
  return (
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reports</h1>
      </div>
      <div className="mt-5">
        <ul>
          <li>Expenses per Category</li>
          <li>Income per Category</li>
          <li>Expenses vs Income vs Budget</li>
          <li>Monthly Expenses (Graph)</li>
          <li>Monthly Income (Graph)</li>
        </ul>
      </div>
    </div>
  )
}
