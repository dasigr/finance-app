import Link from 'next/link';
import { UpdateAccount } from '@/app/ui/account/buttons';
import AccountStatus from '@/app/ui/account/status';
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredAccounts } from '@/app/lib/data';

export default async function AccountsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const accounts = await fetchFilteredAccounts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg md:pt-0">
          <div className="md:hidden">
            {accounts?.map((account) => (
              <div
                key={account.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <Link href={`/dashboard/account/${account.id}/edit`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{account.name}</p>
                      </div>
                    </div>
                    <p className="text-xl font-medium">
                      {formatCurrency(account.balance)}
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
                  Name
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
              {accounts?.map((account) => (
                <tr
                  key={account.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{account.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(account.balance)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <AccountStatus status={account.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAccount id={account.id} />
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
