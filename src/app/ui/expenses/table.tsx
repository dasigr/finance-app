import Image from 'next/image';
import Link from 'next/link';
import { UpdateExpense } from '@/app/ui/expenses/buttons';
import ExpenseStatus from '@/app/ui/expenses/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredExpenses } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

export default async function AccountExpensesTable({
  destination,
  query,
  currentPage,
}: {
  destination: string;
  query: string;
  currentPage: number;
}) {
  const expenses = await fetchFilteredExpenses(query, currentPage);

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
                <Link href={`/dashboard/expenses/${expense.id}/edit?destination=${destination}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 pb-2">{formatDateToLocal(expense.date)}</p>
                      <div className="flex items-center">
                        <Image
                          src={expense.category_image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={expense.category_name}
                        />
                        <div>
                          <p>{expense.category_name}</p>
                          <p className="text-sm text-gray-500">{expense.notes}</p>
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
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDateToLocal(expense.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {expense.category_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {expense.account_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {expense.notes}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ExpenseStatus status={expense.status} />
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
