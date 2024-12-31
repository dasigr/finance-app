import Form from '@/app/ui/account/edit-form';
import Breadcrumbs from '@/app/ui/account/breadcrumbs';
import { fetchAccountById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [account] = await Promise.all([
    fetchAccountById(id),
  ]);

  if (!account) {
    notFound();
  }

  return (
    <main className="pb-12">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/dashboard/account' },
          {
            label: 'Edit Account',
            href: `/dashboard/account/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form account={account} />
    </main>
  );
}
