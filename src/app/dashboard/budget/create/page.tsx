import Form from '@/app/components/budget/create-form';
import Breadcrumbs from '@/app/components/budget/breadcrumbs';
import { fetchExpenseCategories } from '@/app/lib/data';
 
export default async function Page() {
  const expenseCategories = await fetchExpenseCategories();
 
  return (
    <div className="pb-8 mb-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Budget', href: '/dashboard/budget' },
          {
            label: 'Add Budget',
            href: '/dashboard/budget/create',
            active: true,
          },
        ]}
      />
      <Form expenseCategories={expenseCategories} />
    </div>
  );
}
