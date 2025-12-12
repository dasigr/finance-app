import Form from '@/app/components/expense-category/edit-form';
import Breadcrumbs from '@/app/components/expense-category/breadcrumbs';
import { fetchExpenseCategoryById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [expenseCategory] = await Promise.all([
    fetchExpenseCategoryById(id),
  ]);

  if (!expenseCategory) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          {
            label: 'Edit Expense Category',
            href: `/settings/expense-category/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form expenseCategory={expenseCategory} />
    </main>
  );
}
