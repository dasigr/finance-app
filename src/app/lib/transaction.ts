import { sql } from '@vercel/postgres';

type TransactionType = "income" | "expense" | "transfer";

interface CreateTransactionParams {
  userId: number;
  type: TransactionType;
  amount: number;
  description?: string;
  fromAccountId?: number;
  toAccountId?: number;
}

export async function createTransaction({
  userId,
  type,
  amount,
  description,
  fromAccountId,
  toAccountId,
}: CreateTransactionParams) {
  // Begin transaction
  await sql`BEGIN`;

  try {
    // 1️⃣ Insert transaction record
    await sql`
      INSERT INTO transactions (user_id, type, amount, description, from_account_id, to_account_id)
      VALUES (${userId}, ${type}, ${amount}, ${description}, ${fromAccountId}, ${toAccountId});
    `;

    // 2️⃣ Handle account balance updates
    if (type === "income" && toAccountId) {
      await sql`
        UPDATE accounts
        SET balance = balance + ${amount}
        WHERE id = ${toAccountId};
      `;
    } else if (type === "expense" && fromAccountId) {
      await sql`
        UPDATE accounts
        SET balance = balance - ${amount}
        WHERE id = ${fromAccountId};
      `;
    } else if (type === "transfer" && fromAccountId && toAccountId) {
      await sql`
        UPDATE accounts
        SET balance = balance - ${amount}
        WHERE id = ${fromAccountId};
      `;
      await sql`
        UPDATE accounts
        SET balance = balance + ${amount}
        WHERE id = ${toAccountId};
      `;
    }

    // 3️⃣ Commit transaction
    await sql`COMMIT`;

    return { success: true };
  } catch (error) {
    await sql`ROLLBACK`;
    console.error("Transaction failed:", error);
    return { success: false, error: String(error) };
  }
}
