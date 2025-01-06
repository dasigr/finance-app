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
            label: 'Transfer Balance',
            href: '/dashboard/account/transfer',
            active: true,
          },
        ]}
      />
      <Form />
    </div>
  );
}
