import Image from 'next/image';
import { UpdateIncomeCategory, DeleteIncomeCategory } from '@/app/components/income-category/buttons';
import { fetchFilteredIncomeCategory } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

export default async function IncomeCategoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const incomeCategories = await fetchFilteredIncomeCategory(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg md:pt-0">
          <div className="md:hidden">
            {incomeCategories?.map((category) => (
              <div
                key={category.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={category.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${category.name}'s profile picture`}
                      />
                      <p>{category.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateIncomeCategory id={category.id} />
                    <DeleteIncomeCategory id={category.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Income Category
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {incomeCategories?.map((category) => (
                <tr
                  key={category.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={category.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${category.name}'s profile picture`}
                      />
                      <p>{category.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateIncomeCategory id={category.id} />
                      <DeleteIncomeCategory id={category.id} />
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
