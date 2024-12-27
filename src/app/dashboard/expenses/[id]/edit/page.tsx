import Form from '@/app/ui/expenses/edit-form';
import Breadcrumbs from '@/app/ui/expenses/breadcrumbs';
import { fetchExpenseById, fetchExpenseCategories, fetchAccounts } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [expense, expenseCategories, accounts] = await Promise.all([
    fetchExpenseById(id),
    fetchExpenseCategories(),
    fetchAccounts(),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <main>
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
    </main>
  );
}
