import Form from '@/app/ui/income/create-form';
import Breadcrumbs from '@/app/ui/income/breadcrumbs';
import { fetchAccounts, fetchIncomeCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories = await fetchIncomeCategories();
  const accounts = await fetchAccounts();
 
  return (
    <div className="pb-8 mb-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Income', href: '/dashboard/income' },
          {
            label: 'Add Income',
            href: '/dashboard/income/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} accounts={accounts} />
    </div>
  );
}
