import Form from '@/app/components/expense-category/create-form';
import Breadcrumbs from '@/app/components/expense-category/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          {
            label: 'Add Expense Category',
            href: '/settings/expense-category/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
