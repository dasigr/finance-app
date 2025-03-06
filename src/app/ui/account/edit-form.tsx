'use client';

import { AccountForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { Checkbox } from "@/app/ui/components/checkbox";
import { DeleteAccount } from '@/app/ui/account/buttons';
import { updateAccount } from '@/app/lib/actions/account';

export const dynamic = 'force-dynamic';

export default function EditAccountForm({
  account,
}: {
  account: AccountForm;
}) {
  const updateAccountWithId = updateAccount.bind(null, account.id);

  return (
    <>
      <form action={updateAccountWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                defaultValue={account.name}
                placeholder="Name of the account"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Balance */}
          <div className="mb-4">
            <label htmlFor="balance" className="mb-2 block text-sm font-medium">
              Balance
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="balance"
                  name="balance"
                  type="number"
                  step="0.01"
                  defaultValue={account.balance}
                  disabled={true}
                  placeholder="Enter the amount"
                  className="peer block w-full rounded-md bg-gray-100 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label htmlFor="weight" className="mb-2 block text-sm font-medium">
              Weight
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  step="1"
                  defaultValue={account.weight}
                  placeholder="Enter weight"
                  className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <Checkbox
                    id="status"
                    name="status"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    value="true"
                    defaultChecked={account.status ? true : false}
                    aria-describedby="status-error"
                  />
                  <label
                    htmlFor="status"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Active
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`/dashboard/account/${account.id}`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <DeleteAccount id={account.id} />
    </>
  );
}
