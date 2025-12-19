import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  BudgetForm,
  BudgetTable,
  ExpenseCategoryForm,
  ExpenseCategoryTable,
  AccountField,
  AccountForm,
  AccountsTable,
  ExpenseForm,
  ExpensesTable,
  ExpenseCategoryField,
  IncomeForm,
  IncomesTable,
  IncomeCategoryField,
  IncomeCategoryForm,
  IncomeCategoryTable,
  Revenue,
  TransactionsTable,
} from './definitions';
import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 50;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* Revenue */

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

/* Invoices */

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices`;
    const incomeStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM transaction
        WHERE transaction.type = 'income'
        AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)`;
    const expenseStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM transaction
        WHERE transaction.type = 'expense'
        AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)`;
    const accountStatusPromise = sql`SELECT
        SUM(balance) AS "balance"
        FROM account
        WHERE account.status = TRUE`;
    const budgetStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM budget`;
    const debtStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM debt`;
    const portfolioStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM portfolio`;

    const data = await Promise.all([
      // invoiceCountPromise,
      // customerCountPromise,
      // invoiceStatusPromise,
      incomeStatusPromise,
      expenseStatusPromise,
      accountStatusPromise,
      budgetStatusPromise,
      debtStatusPromise,
      portfolioStatusPromise,
    ]);

    // const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
    const totalIncomeAmount = formatCurrency(data[0].rows[0].amount ?? '0');
    const totalExpensesAmount = formatCurrency(data[1].rows[0].amount ?? '0');
    const totalAccountBalance = formatCurrency(data[2].rows[0].balance ?? '0');
    const totalBudgetAmount = formatCurrency(data[3].rows[0].amount ?? '0');
    const totalDebtAmount = formatCurrency(data[4].rows[0].amount ?? '0');
    const totalPortfolioAmount = formatCurrency(data[5].rows[0].amount ?? '0');

    // console.log('Data fetch completed after 3 seconds.');

    return {
      totalIncomeAmount,
      totalExpensesAmount,
      totalAccountBalance,
      totalBudgetAmount,
      totalDebtAmount,
      totalPortfolioAmount,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

/* Budget */

export async function fetchLatestBudget() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchFilteredBudget(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<BudgetTable>`
      SELECT
        budget.id,
        budget.amount,
        budget.category_id,
        category.name AS "category_name",
        category.description AS "category_description",
        category.image_url AS "category_image_url"
      FROM budget
      JOIN category ON budget.category_id = category.id
      ORDER BY category.weight ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const budget = data.rows.map((budget) => ({
      ...budget,
      // Convert amount from cents to dollars
      // amount: budget.amount / 100,
    }));

    return budget;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budgets.');
  }
}

export async function fetchBudgetPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM budget
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of budgets.');
  }
}

export async function fetchBudgetById(id: string) {
  try {
    const data = await sql<BudgetForm>`
      SELECT
        budget.id,
        budget.category_id,
        budget.amount
      FROM budget
      WHERE budget.id = ${id};
    `;

    const budget = data.rows.map((budget) => ({
      ...budget,
      // Convert amount from cents to dollars
      amount: budget.amount / 100,
    }));

    return budget[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget.');
  }
}

/* Income Category */

export async function fetchIncomeCategories() {
  try {
    const data = await sql<IncomeCategoryField>`
      SELECT
        id,
        name,
        image_url
      FROM category
      WHERE category.type = 'income'
      ORDER BY name ASC
    `;

    const incomeCategories = data.rows;
    return incomeCategories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all income categories.');
  }
}

export async function fetchIncomeCategoryPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM income_category
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of income categories.');
  }
}

export async function fetchIncomeCategoryById(id: string) {
  try {
    const data = await sql<IncomeCategoryForm>`
      SELECT
        income_category.id,
        income_category.name,
        income_category.image_url
      FROM income_category
      WHERE income_category.id = ${id};
    `;

    const income_category = data.rows;

    return income_category[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch income category.');
  }
}

export async function fetchFilteredIncomeCategory(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const incomeCategories = await sql<IncomeCategoryTable>`
      SELECT
        income_category.id,
        income_category.name,
        income_category.image_url
      FROM income_category
      WHERE
        income_category.name ILIKE ${`%${query}%`}
      ORDER BY income_category.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return incomeCategories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch income categories.');
  }
}

/* Expense Category */

export async function fetchExpenseCategories() {
  try {
    const data = await sql<ExpenseCategoryField>`
      SELECT
        id,
        name,
        image_url
      FROM category
      WHERE category.type = 'expense'
      ORDER BY name ASC
    `;

    const expenseCategories = data.rows;
    return expenseCategories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all expense categories.');
  }
}

export async function fetchExpenseCategoryPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM expense_category
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of expense categories.');
  }
}

export async function fetchExpenseCategoryById(id: string) {
  try {
    const data = await sql<ExpenseCategoryForm>`
      SELECT
        expense_category.id,
        expense_category.name,
        expense_category.image_url
      FROM expense_category
      WHERE expense_category.id = ${id};
    `;

    const expense_category = data.rows;

    return expense_category[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense category.');
  }
}

export async function fetchFilteredExpenseCategory(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const expenseCategories = await sql<ExpenseCategoryTable>`
      SELECT
        expense_category.id,
        expense_category.name,
        expense_category.image_url
      FROM expense_category
      WHERE
        expense_category.name ILIKE ${`%${query}%`}
      ORDER BY expense_category.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return expenseCategories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense categories.');
  }
}

/* Account */

export async function fetchAccounts() {
  try {
    const data = await sql<AccountField>`
      SELECT
        id,
        name,
        balance,
        weight,
        status
      FROM account
      WHERE account.status = TRUE
      ORDER BY account.weight ASC
    `;

    const account = data.rows;
    return account;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all accounts.');
  }
}

export async function fetchFilteredAccounts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const accounts = await sql<AccountsTable>`
      SELECT
        account.id,
        account.name,
        account.balance,
        account.weight,
        account.status
      FROM account
      ORDER BY account.status DESC, account.weight ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return accounts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch accounts.');
  }
}

export async function fetchAccountPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM account
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of accounts.');
  }
}

export async function fetchAccountById(id: string) {
  try {
    const data = await sql<AccountForm>`
      SELECT
        account.id,
        account.name,
        account.balance,
        account.weight,
        account.status
      FROM account
      WHERE account.id = ${id};
    `;

    const account = data.rows.map((account) => ({
      ...account,
      // Convert amount from cents to dollars
      balance: account.balance / 100,
    }));

    return account[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch account.');
  }
}

/* Transactions */

export async function fetchTransactions(
  currentPage: number,
  account_id?: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    let transactions;

    if (account_id) {
      transactions = await sql<TransactionsTable>`
        SELECT
          transaction.id,
          transaction.date,
          transaction.type,
          transaction.from_account_id,
          transaction.to_account_id,
          transaction.amount,
          transaction.description AS "notes",
          category.name AS "category_name",
          category.image_url AS "category_image_url",
          account.name AS "account_name"
        FROM transaction
        LEFT JOIN category ON transaction.category_id = category.id
        LEFT JOIN account ON transaction.from_account_id = account.id
        WHERE (transaction.from_account_id = ${account_id} OR transaction.to_account_id = ${account_id})
        AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
        AND transaction.date <= NOW()
        ORDER BY transaction.date DESC, transaction.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else {
      transactions = await sql<TransactionsTable>`
        SELECT
          transaction.id,
          transaction.date,
          transaction.type,
          transaction.amount,
          transaction.description AS "notes",
          category.name AS "category_name",
          category.image_url AS "category_image_url",
          account.name AS "account_name"
        FROM transaction
        JOIN category ON transaction.category_id = category.id
        JOIN account ON transaction.from_account_id = account.id
        WHERE DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
        AND transaction.date <= NOW()
        ORDER BY transaction.date DESC, transaction.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    }

    return transactions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions.');
  }
}

/* Expenses */
export async function fetchFilteredExpenses(
  currentPage: number,
  account_id?: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    let expenses;

    if (account_id) {
      expenses = await sql<ExpensesTable>`
        SELECT
          transaction.id,
          transaction.date,
          transaction.amount,
          transaction.description AS "notes",
          category.name AS "category_name",
          category.image_url AS "category_image_url",
          account.name AS "account_name"
        FROM transaction
        JOIN category ON transaction.category_id = category.id
        JOIN account ON transaction.from_account_id = account.id
        WHERE transaction.from_account_id = ${account_id}
        AND transaction.type = 'expense'
        AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
        AND transaction.date <= NOW()
        ORDER BY transaction.date DESC, transaction.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else {
      expenses = await sql<ExpensesTable>`
        SELECT
          transaction.id,
          transaction.date,
          transaction.amount,
          transaction.description AS "notes",
          category.name AS "category_name",
          category.image_url AS "category_image_url",
          account.name AS "account_name"
        FROM transaction
        JOIN category ON transaction.category_id = category.id
        JOIN account ON transaction.from_account_id = account.id
        WHERE transaction.type = 'expense'
        AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
        AND transaction.date <= NOW()
        ORDER BY transaction.date DESC, transaction.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    }

    return expenses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expenses.');
  }
}

export async function fetchAccountTransactionsPages(account_id: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM transaction
    JOIN category ON transaction.category_id = category.id
    JOIN account ON transaction.from_account_id = account.id
    WHERE transaction.from_account_id = ${account_id}
    AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of expenses.');
  }
}

export async function fetchAccountExpensesPages(account_id: string, query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM transaction
    JOIN category ON transaction.category_id = category.id
    JOIN account ON transaction.from_account_id = account.id
    WHERE transaction.from_account_id = ${account_id}
    AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of expenses.');
  }
}

export async function fetchExpensesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM expense
    JOIN expense_category ON expense.category_id = expense_category.id
    JOIN account ON expense.account_id = account.id
    WHERE DATE_TRUNC('month', expense.date) = DATE_TRUNC('month', CURRENT_DATE)
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of expenses.');
  }
}

export async function fetchExpenseById(id: string) {
  try {
    const data = await sql<ExpenseForm>`
      SELECT
        transaction.id,
        transaction.date,
        transaction.amount,
        transaction.description AS "notes",
        category.id AS "category_id",
        account.id AS "account_id"
      FROM transaction
      JOIN category ON transaction.category_id = category.id
      JOIN account ON transaction.from_account_id = account.id
      WHERE transaction.id = ${id}
      AND transaction.date <= NOW();
    `;

    const expense = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount / 100,
    }));

    return expense[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense.');
  }
}

/* Income */

export async function fetchFilteredIncomes(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const incomes = await sql<IncomesTable>`
      SELECT
        transaction.id,
        transaction.date,
        transaction.amount,
        transaction.description AS "notes",
        category.name AS "category_name",
        category.image_url AS "category_image_url",
        account.name AS "account_name"
      FROM transaction
      JOIN category ON transaction.category_id = category.id
      JOIN account ON transaction.to_account_id = account.id
      WHERE transaction.type = 'income'
      AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
      ORDER BY transaction.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return incomes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch incomes.');
  }
}

export async function fetchIncomesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM transaction
    JOIN category ON transaction.category_id = category.id
    JOIN account ON transaction.to_account_id = account.id
    WHERE transaction.type = 'income'
    AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of incomes.');
  }
}

export async function fetchIncomeById(id: string) {
  try {
    const data = await sql<IncomeForm>`
      SELECT
        transaction.id,
        transaction.date,
        transaction.amount,
        transaction.description AS "notes",
        category.id AS "category_id",
        account.id AS "account_id"
      FROM transaction
      JOIN category ON transaction.category_id = category.id
      JOIN account ON transaction.to_account_id = account.id
      WHERE transaction.id = ${id};
    `;

    const income = data.rows.map((income) => ({
      ...income,
      // Convert amount from cents to dollars
      amount: income.amount / 100,
    }));

    return income[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch income.');
  }
}

/* Customers */

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
