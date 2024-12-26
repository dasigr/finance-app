import Form from '@/app/ui/budget/create-form';
import Breadcrumbs from '@/app/ui/budget/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Budget', href: '/dashboard/budget' },
          {
            label: 'Create Budget',
            href: '/dashboard/budget/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
