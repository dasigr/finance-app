import Image from 'next/image';
import Link from 'next/link';
import { UpdateExpense } from '@/app/components/expenses/buttons';
import ExpenseStatus from '@/app/components/expenses/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredPortfolio } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

export default async function PortfolioTable({
  currentPage,
}: {
  account_id?: string,
  currentPage: number;
}) {
  const expenses = await fetchFilteredPortfolio(currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg md:pt-0">
          <div className="md:hidden">
            {expenses?.map((expense) => (
              <div
                key={expense.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <Link href={`/dashboard/portfolio/${expense.id}/edit`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div>
                          <p>{expense.name}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-medium">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Account
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Notes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {expenses?.map((expense) => (
                <tr
                  key={expense.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {expense.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateExpense id={expense.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
