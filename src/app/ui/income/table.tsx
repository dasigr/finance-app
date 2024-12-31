import Image from 'next/image';
import Link from 'next/link';
import { UpdateIncome, DeleteIncome } from '@/app/ui/income/buttons';
import IncomeStatus from '@/app/ui/income/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredIncomes } from '@/app/lib/data';

export default async function IncomesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const incomes = await fetchFilteredIncomes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg md:pt-0">
          <div className="md:hidden">
            {incomes?.map((income) => (
              <div
                key={income.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <Link href={`/dashboard/income/${income.id}/edit`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 pb-2">{formatDateToLocal(income.date)}</p>
                      <div className="flex items-center">
                        <Image
                          src={income.category_image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={income.category_name}
                        />
                        <div>
                          <p>{income.category_name}</p>
                          <p className="text-sm text-gray-500">{income.notes}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-medium">
                      {formatCurrency(income.amount)}
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
              {incomes?.map((income) => (
                <tr
                  key={income.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDateToLocal(income.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {income.category_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {income.account_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {income.notes}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(income.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <IncomeStatus status={income.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateIncome id={income.id} />
                      <DeleteIncome id={income.id} />
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
