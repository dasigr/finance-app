import Form from '@/app/components/income-category/edit-form';
import Breadcrumbs from '@/app/components/income-category/breadcrumbs';
import { fetchIncomeCategoryById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [incomeCategory] = await Promise.all([
    fetchIncomeCategoryById(id),
  ]);

  if (!incomeCategory) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          {
            label: 'Edit Income Category',
            href: `/settings/income-category/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form incomeCategory={incomeCategory} />
    </main>
  );
}
