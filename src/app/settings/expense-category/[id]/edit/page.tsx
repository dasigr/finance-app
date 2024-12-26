import Form from '@/app/ui/expense-category/edit-form';
import Breadcrumbs from '@/app/ui/expense-category/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
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
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
