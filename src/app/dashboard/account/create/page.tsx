import Form from '@/app/ui/account/create-form';
import Breadcrumbs from '@/app/ui/account/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <div className="pb-8 mb-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/dashboard/account' },
          {
            label: 'Create Account',
            href: '/dashboard/account/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </div>
  );
}
