import { deleteAccount } from '@/app/lib/actions/account';
import { PencilIcon, PlusIcon, TrashIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateAccount() {
  return (
    <Link
      href="/dashboard/account/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Account</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAccount({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/account/${id}/edit`}
      className="rounded-md border p-2 bg-white hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAccount({ id }: { id: string }) {
  const deleteAccountWithId = deleteAccount.bind(null, id);

  return (
    <form action={deleteAccountWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete {id}</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function TransferAccountBalance() {
  return (
    <Link
      href={`/dashboard/account/transfer`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Transfer Account Balance</span>{' '}
      <ArrowsRightLeftIcon className="h-5 md:ml-4" />
    </Link>
  );
}
