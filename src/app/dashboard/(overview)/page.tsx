import { Metadata } from 'next';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import {
  CardsSkeleton,
} from '@/app/ui/skeletons';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
    </div>
  );
}
