import Form from '@/app/ui/account/edit-form';
import Breadcrumbs from '@/app/ui/account/breadcrumbs';
import { fetchAccountById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [account, customers] = await Promise.all([
    fetchAccountById(id),
    fetchCustomers(),
  ]);

  if (!account) {
    notFound();
  }

  return (
    <main>
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
      <Form account={account} customers={customers} />
    </main>
  );
}
