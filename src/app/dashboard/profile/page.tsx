import { signOut } from '@/auth';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { PowerIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  return (
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
      </div>
      <div className="mt-5 flex w-full justify-center gap-2">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
