import { Progress } from "@/app/ui/components/progress";
import { fetchFutureExpenseAmountByCategoryId, fetchTotalExpenseAmountByCategoryId } from '@/app/lib/actions/expense';
import { formatCurrency } from "@/app/lib/utils";

export async function BudgetExpense({ categoryId, budgetAmount }: { categoryId: string, budgetAmount: number }) {
  const currentExpenseAmount = await fetchTotalExpenseAmountByCategoryId(categoryId) * 100;
  const futureExpenseAmount = await fetchFutureExpenseAmountByCategoryId(categoryId) * 100;
  const expensePercent = ((currentExpenseAmount + futureExpenseAmount) / budgetAmount) * 100;

  return (
    <>
      <p className="text-xs">{expensePercent.toFixed(0)}%</p>
      <Progress value={expensePercent} />
      <p className="text-xs mt-4">Current Expense: {formatCurrency(currentExpenseAmount)}</p>
      <p className="text-xs">Future Expense: {formatCurrency(futureExpenseAmount)}</p>
    </>
  )
}
