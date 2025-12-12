'use client';

import { IncomeCategoryForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { updateIncomeCategory } from '@/app/lib/actions/income-category';

export const dynamic = 'force-dynamic';

export default function EditIncomeCategoryForm({
  incomeCategory,
}: {
  incomeCategory: IncomeCategoryForm;
}) {
  const updateIncomeCategoryWithId = updateIncomeCategory.bind(null, incomeCategory.id);

  return (
    <form action={updateIncomeCategoryWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                defaultValue={incomeCategory.name}
                placeholder="Enter income category"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/settings/income-category"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
