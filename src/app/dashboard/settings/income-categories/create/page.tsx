import Form from '@/app/components/income-category/create-form';
import Breadcrumbs from '@/app/components/income-category/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          {
            label: 'Add Income Category',
            href: '/settings/income-category/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
