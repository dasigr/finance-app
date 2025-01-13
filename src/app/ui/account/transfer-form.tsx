'use client';

import { useActionState } from "react";
import { AccountField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { transferAccountBalance, State } from '@/app/lib/actions/account-transfer';

export default function Form({ accounts }: { accounts: AccountField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(transferAccountBalance, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* From Account */}
        <div className="mb-4">
          <label htmlFor="fromAccountId" className="mb-2 block text-sm font-medium">
            Account
          </label>
          <div className="relative">
            <select
              id="fromAccountId"
              name="fromAccountId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="fromAccountId-error"
            >
              <option value="" disabled>
                From account
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="fromAccountId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fromAccountId &&
              state.errors.fromAccountId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key="error">
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* To Account */}
        <div className="mb-4">
          <label htmlFor="toAccountId" className="mb-2 block text-sm font-medium">
            Account
          </label>
          <div className="relative">
            <select
              id="toAccountId"
              name="toAccountId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="toAccountId-error"
            >
              <option value="" disabled>
                To account
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="toAccountId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.toAccountId &&
              state.errors.toAccountId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key="error">
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter the amount to transfer"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key="error">
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/account"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Transfer</Button>
      </div>
    </form>
  );
}
