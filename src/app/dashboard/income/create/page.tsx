import Form from '@/app/components/income/create-form';
import Breadcrumbs from '@/app/components/income/breadcrumbs';
import { fetchAccounts, fetchIncomeCategories } from '@/app/lib/data';

export const dynamic = 'force-dynamic';
 
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
