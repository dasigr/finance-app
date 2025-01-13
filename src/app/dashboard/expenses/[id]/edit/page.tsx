import Form from '@/app/ui/expenses/edit-form';
import Breadcrumbs from '@/app/ui/expenses/breadcrumbs';
import { fetchExpenseById, fetchExpenseCategories, fetchAccounts } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page(
  props: { 
      params: Promise<{ id: string, destination: string }> 
    }
) {
  const params = await props.params;
  const id = params.id;
  const destination = params?.destination || '';

  const [expense, expenseCategories, accounts] = await Promise.all([
    fetchExpenseById(id),
    fetchExpenseCategories(),
    fetchAccounts(),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <div className="pb-8 mb-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Edit Expense',
            href: `/dashboard/expenses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form expense={expense} expenseCategories={expenseCategories} accounts={accounts} />
    </div>
  );
}
