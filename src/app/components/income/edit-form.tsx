'use client';

import { useActionState } from 'react';
import { AccountField, IncomeCategoryField, IncomeForm } from '@/app/lib/definitions';
import { formatDateForInput } from '@/app/lib/utils';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { Checkbox } from "@/app/components/ui/checkbox";
import { DeleteIncome } from '@/app/components/income/buttons';
import { updateIncome } from '@/app/lib/actions/income';

export const dynamic = 'force-dynamic';

const initialState = {
  values: {
    // id: '',
    date: '',
    categoryId: '',
    accountId: '',
    amount: 0,
    notes: '',
    status: 'true'
  }
}

export default function EditIncomeForm({
  income,
  incomeCategories,
  accounts,
}: {
  income: IncomeForm;
  incomeCategories: IncomeCategoryField[];
  accounts: AccountField[];
}) {
  // initialState['values']['id'] = income.id
  initialState['values']['date'] = income.date
  initialState['values']['categoryId'] = income.category_id
  initialState['values']['accountId'] = income.account_id
  initialState['values']['amount'] = income.amount
  initialState['values']['notes'] = income.notes
  initialState['values']['status'] = 'true'

  const [state, formAction, pending] = useActionState(updateIncome, initialState)
  // const updateIncomeWithId = updateIncome.bind(null, income.id);

  return (
    <>
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                  defaultValue={state.values?.amount}
                  placeholder="Enter USD amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              {state.errors?.amount && 
              <ul>
                {state.errors?.amount?.map((value, idx) => (
                  <li className='text-sm text-red-600' key={idx}>{value}</li>
                ))}
              </ul>
              }
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="categoryId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={state.values?.categoryId}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {incomeCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {state.errors?.categoryId?.[0] && <p>{state.errors.categoryId[0]}</p>}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-sm font-medium">
              Date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={formatDateForInput(state.values?.date)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              {state.errors?.date?.[0] && <p>{state.errors.date[0]}</p>}
            </div>
          </div>

          {/* Account */}
          <div className="mb-4">
            <label htmlFor="account" className="mb-2 block text-sm font-medium">
              Account
            </label>
            <div className="relative">
              <select
                id="account"
                name="accountId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={state.values?.accountId}
              >
                <option value="" disabled>
                  Select an account
                </option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {state.errors?.accountId?.[0] && <p>{state.errors.accountId[0]}</p>}
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
              Notes
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea 
                  name="notes" 
                  id="notes" 
                  rows={2}
                  defaultValue={state.values?.notes}
                  className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="notes-error"
                >
                </textarea>
              </div>
              {state.errors?.notes?.[0] && <p>{state.errors.notes[0]}</p>}
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
                    defaultChecked={income.status ? true : false}
                    aria-describedby="status-error"
                  />
                  <label
                    htmlFor="status"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Cleared
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/income"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-white"
          >
            Cancel
          </Link>
          <Button type="submit">{pending ? 'Saving...' : 'Save'}</Button>
        </div>
      </form>
      <DeleteIncome id={income.id} />
    </>
  );
}
