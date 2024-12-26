import Link from 'next/link';
import { fetchCardData } from '@/app/lib/data';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  income: BanknotesIcon,
  expenses: ClockIcon,
  account: InboxIcon,
  budget: UserGroupIcon,
};

export default async function CardWrapper() {
  const {
    totalIncomeAmount,
    totalExpensesAmount,
    totalAccountBalance,
    totalBudgetAmount
  } = await fetchCardData()

  return (
    <>
      <Card title="Income" value={totalIncomeAmount} type="income" />
      <Card title="Expenses" value={totalExpensesAmount} type="expenses" />
      <Card title="Account" value={totalAccountBalance} type="account" />
      <Card title="Budget" value={totalBudgetAmount} type="budget" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'income' | 'expenses' | 'account' | 'budget';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <Link href={`/dashboard/${type}`} className="">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-2 text-center text-2xl`}>
          {value}
        </p>
      </Link>
    </div>
  );
}
