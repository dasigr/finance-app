import Link from 'next/link';
import Image from 'next/image';
import { UpdateBudget } from '@/app/components/budget/buttons';
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBudget } from '@/app/lib/data';
import { BudgetExpense } from '@/app/components/budget/budget-expense';

export const dynamic = 'force-dynamic';

export default async function BudgetTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const budgets = await fetchFilteredBudget(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg md:pt-0">
          <div className="md:hidden">
            {budgets?.map((budget) => (
              <div
                key={budget.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <Link href={`/dashboard/budget/${budget.id}/edit`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <Image
                          src={budget.category_image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${budget.category_name}'s profile picture`}
                        />
                        <div>
                          <p>{budget.category_name}</p>
                          <p className="text-sm text-gray-500">Monthly</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-medium">
                        {formatCurrency(budget.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <BudgetExpense categoryId={budget.category_id} budgetAmount={budget.amount} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {budgets?.map((budget) => (
                <tr
                  key={budget.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={budget.category_image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={budget.category_name}
                      />
                      <p>{budget.category_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(budget.amount)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateBudget id={budget.id} />
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
