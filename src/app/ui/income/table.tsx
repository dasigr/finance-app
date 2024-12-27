import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/income/buttons';
import ExpenseStatus from '@/app/ui/income/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredIncomes } from '@/app/lib/data';

export default async function IncomesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const expenses = await fetchFilteredIncomes(query, currentPage);

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
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={expense.category_image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={expense.category_name}
                      />
                      <p>{expense.category_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{expense.notes}</p>
                  </div>
                  <ExpenseStatus status={expense.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p>{formatDateToLocal(expense.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={expense.id} />
                    <DeleteInvoice id={expense.id} />
                  </div>
                </div>
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
                      <UpdateInvoice id={expense.id} />
                      <DeleteInvoice id={expense.id} />
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
