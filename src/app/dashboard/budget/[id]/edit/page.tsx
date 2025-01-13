import Form from '@/app/ui/budget/edit-form';
import Breadcrumbs from '@/app/ui/budget/breadcrumbs';
import { fetchBudgetById, fetchExpenseCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [budget, expenseCategories] = await Promise.all([
    fetchBudgetById(id),
    fetchExpenseCategories()
  ]);

  if (!budget) {
    notFound();
  }

  return (
    <main className="pb-12">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Budget', href: '/dashboard/budget' },
          {
            label: 'Edit Budget',
            href: `/dashboard/budget/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form budget={budget} expenseCategories={expenseCategories}/>
    </main>
  );
}
