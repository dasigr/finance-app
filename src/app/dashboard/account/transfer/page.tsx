import Form from '@/app/ui/account/transfer-form';
import Breadcrumbs from '@/app/ui/account/breadcrumbs';
import { fetchAccounts } from '@/app/lib/data';
 
export default async function Page() {
  const accounts = await fetchAccounts();
 
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
      <Form accounts={accounts} />
    </div>
  );
}
