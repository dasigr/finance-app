import Form from '@/app/ui/income/create-form';
import Breadcrumbs from '@/app/ui/income/breadcrumbs';
import { fetchAccounts, fetchExpenseCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories = await fetchExpenseCategories();
  const accounts = await fetchAccounts();
 
  return (
    <main className="pb-12">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Income', href: '/dashboard/income' },
          {
            label: 'Create Income',
            href: '/dashboard/income/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} accounts={accounts} />
    </main>
  );
}
