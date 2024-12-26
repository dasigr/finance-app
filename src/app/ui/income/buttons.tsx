import { deleteBudget } from '@/app/lib/actions/budget';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateBudget() {
  return (
    <Link
      href="/dashboard/budget/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Budget</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBudget({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/budget/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBudget({ id }: { id: string }) {
  const deleteBudgetWithId = deleteBudget.bind(null, id);

  return (
    <form action={deleteBudgetWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete {id}</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
