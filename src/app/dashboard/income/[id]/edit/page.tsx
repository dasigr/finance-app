import Form from '@/app/components/income/edit-form';
import Breadcrumbs from '@/app/components/income/breadcrumbs';
import { fetchIncomeById, fetchIncomeCategories, fetchAccounts } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
    <div className="pb-8 mb-8">
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
    </div>
  );
}
