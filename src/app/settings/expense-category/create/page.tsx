import Form from '@/app/ui/expense-category/create-form';
import Breadcrumbs from '@/app/ui/expense-category/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          {
            label: 'Create Expense Category',
            href: '/settings/expense-category/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
