import Form from '@/app/ui/income/edit-form';
import Breadcrumbs from '@/app/ui/income/breadcrumbs';
import { fetchIncomeById, fetchIncomeCategories, fetchAccounts } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [income, incomeCategories, accounts] = await Promise.all([
    fetchIncomeById(id),
    fetchIncomeCategories(),
    fetchAccounts(),
  ]);

  if (!income) {
    notFound();
  }

  return (
    <main className="pb-12">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Income', href: '/dashboard/income' },
          {
            label: 'Edit Income',
            href: `/dashboard/income/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form income={income} incomeCategories={incomeCategories} accounts={accounts} />
    </main>
  );
}
