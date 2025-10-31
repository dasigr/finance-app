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

export const dynamic = 'force-dynamic';

export default async function CardWrapper() {
  const {
    totalIncomeAmount,
    totalExpensesAmount,
    totalAccountBalance,
    totalBudgetAmount
  } = await fetchCardData()

  return (
    <>
      <Card title="Income" value={totalIncomeAmount} type="income" bgColor="bg-green-600" />
      <Card title="Expenses" value={totalExpensesAmount} type="expenses" bgColor="bg-red-400" />
      <Card title="Account" value={totalAccountBalance} type="account" bgColor="bg-blue-400" />
      <Card title="Budget" value={totalBudgetAmount} type="budget" bgColor="bg-pink-400" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  bgColor,
}: {
  title: string;
  value: number | string;
  type: 'income' | 'expenses' | 'account' | 'budget';
  bgColor: 'bg-green-600' | 'bg-red-400' | 'bg-blue-400' | 'bg-pink-400';
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-xl p-2 shadow-sm ${bgColor}`}>
      <Link href={`/dashboard/${type}`} className="">
        <div className="flex pt-4 px-4">
          {Icon ? <Icon className="h-5 w-5 text-white" /> : null}
          <h3 className="ml-2 text-sm text-white font-medium">{title}</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl px-4 py-2 text-center text-2xl text-white`}>
          {value}
        </p>
      </Link>
    </div>
  );
}
