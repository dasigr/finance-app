import { useActionState } from "react";
'use client';

import { ExpenseCategoryField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createBudget, State } from '@/app/lib/actions/budget';

export default function Form({ 
    expenseCategories
  }: { 
    expenseCategories: ExpenseCategoryField[]
  }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createBudget, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <div className="relative">
            <select
              id="categoryId"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Select a category
              </option>
              {expenseCategories.map((expenseCategory) => (
                <option key={expenseCategory.id} value={expenseCategory.id}>
                  {expenseCategory.name}
                </option>
              ))}
            </select>
          </div>
          <div id="expense-category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.categoryId &&
              state.errors.categoryId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key="error">
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Invoice Amount */}
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
                placeholder="Enter the amount"
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
          href="/dashboard/budget"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
