import { Progress } from "@/components/ui/progress";
import { fetchTotalExpenseAmount, fetchFutureExpenseAmount } from '@/app/lib/actions/expense';
import { formatCurrency } from "@/app/lib/utils";

export async function BudgetStatus({ budgetAmount }: { budgetAmount: number }) {
  const currentExpenseAmount = await fetchTotalExpenseAmount();
  const futureExpenseAmount = await fetchFutureExpenseAmount();
  const totalExpenseAmount = Number(currentExpenseAmount) + Number(futureExpenseAmount);
  const expensePercent = (totalExpenseAmount / budgetAmount) * 100;

  return (
    <>
      <p className="text-xs">{expensePercent.toFixed(0)}%</p>
      <Progress value={expensePercent} />
      <p className="text-xs mt-4">Current Expense: {formatCurrency(currentExpenseAmount)}</p>
      <p className="text-xs">Future Expense: {formatCurrency(futureExpenseAmount)}</p>
    </>
  )
}
