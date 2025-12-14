import { sql } from '@vercel/postgres';

type TransactionType = "income" | "expense" | "transfer";

interface CreateTransactionParams {
  userId: string;
  type: TransactionType;
  amount_n: number;
  description?: string;
  categoryId_n?: string;
  fromAccountId?: string;
  toAccountId?: string;
  date: string;
}

interface UpdateTransactionParams {
  id: string;
  userId: string;
  type: TransactionType;
  amount_n: number;
  description?: string;
  categoryId_n?: string;
  fromAccountId?: string;
  toAccountId?: string;
  date: string;
}

export async function createTransaction({
  userId,
  type,
  amount_n,
  description,
  categoryId_n,
  fromAccountId,
  toAccountId,
  date
}: CreateTransactionParams) {
  // Begin transaction
  await sql`BEGIN`;

  try {
    // 1️⃣ Insert transaction record
    await sql`
      INSERT INTO transaction (user_id, type, amount, description, category_id, from_account_id, to_account_id, date)
      VALUES (${userId}, ${type}, ${amount_n}, ${description}, ${categoryId_n}, ${fromAccountId}, ${toAccountId}, ${date});
    `;

    // 2️⃣ Handle account balance updates
    if (type === "income" && toAccountId) {
      await sql`
        UPDATE account
        SET balance = balance + ${amount_n}
        WHERE id = ${toAccountId};
      `;
    } else if (type === "expense" && fromAccountId) {
      await sql`
        UPDATE account
        SET balance = balance - ${amount_n}
        WHERE id = ${fromAccountId};
      `;
    } else if (type === "transfer" && fromAccountId && toAccountId) {
      await sql`
        UPDATE account
        SET balance = balance - ${amount_n}
        WHERE id = ${fromAccountId};
      `;
      await sql`
        UPDATE account
        SET balance = balance + ${amount_n}
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

export async function updateTransaction({
  id,
  userId,
  type,
  amount_n,
  description,
  categoryId_n,
  fromAccountId,
  toAccountId,
  date
}: UpdateTransactionParams) {
  // Begin transaction
  await sql`BEGIN`;

  try {
    // 1️⃣ Insert transaction record
    await sql`
      UPDATE transaction
      SET user_id = ${userId},
          type = ${type},
          amount = ${amount_n},
          description = ${description},
          category_id = ${categoryId_n},
          from_account_id = ${fromAccountId},
          to_account_id = ${toAccountId}
      WHERE id = ${id};
    `;

    // 2️⃣ Handle account balance updates
    if (type === "income" && toAccountId) {
      await sql`
        UPDATE account
        SET balance = balance + ${amount_n}
        WHERE id = ${toAccountId};
      `;
    } else if (type === "expense" && fromAccountId) {
      await sql`
        UPDATE account
        SET balance = balance - ${amount_n}
        WHERE id = ${fromAccountId};
      `;
    } else if (type === "transfer" && fromAccountId && toAccountId) {
      await sql`
        UPDATE account
        SET balance = balance - ${amount_n}
        WHERE id = ${fromAccountId};
      `;
      await sql`
        UPDATE account
        SET balance = balance + ${amount_n}
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
