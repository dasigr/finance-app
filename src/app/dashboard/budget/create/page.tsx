import Form from '@/app/ui/budget/create-form';
import Breadcrumbs from '@/app/ui/budget/breadcrumbs';
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
