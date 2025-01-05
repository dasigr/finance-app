'use client';

import { ExpenseCategoryField, AccountField, ExpenseForm } from '@/app/lib/definitions';
import { formatDateForInput } from '@/app/lib/utils';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteExpense } from '@/app/ui/expenses/buttons';
import { updateExpense } from '@/app/lib/actions/expense';

export default function EditExpenseForm({
  expense,
  expenseCategories,
  accounts
}: {
  expense: ExpenseForm;
  expenseCategories: ExpenseCategoryField[];
  accounts: AccountField[];
}) {
  const updateExpenseWithId = updateExpense.bind(null, expense.id);

  return (
    <>
      <form action={updateExpenseWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Expense Amount */}
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
                  defaultValue={expense.amount}
                  placeholder="Enter USD amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
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
                defaultValue={expense.category_id}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {expenseCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
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
                  defaultValue={formatDateForInput(expense.date)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
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
                defaultValue={expense.account_id}
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
                  defaultValue={expense.notes}
                  className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="notes-error"
                >
                </textarea>
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
                    defaultChecked={expense.status ? true : false}
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
            href="/dashboard/expenses"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-white"
          >
            Cancel
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <DeleteExpense id={expense.id} />
    </>
  );
}
