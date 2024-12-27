import Form from '@/app/ui/expenses/create-form';
import Breadcrumbs from '@/app/ui/expenses/breadcrumbs';
import { fetchAccounts, fetchExpenseCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories = await fetchExpenseCategories();
  const accounts = await fetchAccounts();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Create Expense',
            href: '/dashboard/expenses/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} accounts={accounts} />
    </main>
  );
}
