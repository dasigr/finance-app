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
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 10;

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
        FROM income
        WHERE DATE_TRUNC('month', income.date) = DATE_TRUNC('month', CURRENT_DATE)`;
    const expenseStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM expense
        WHERE DATE_TRUNC('month', expense.date) = DATE_TRUNC('month', CURRENT_DATE)`;
    const accountStatusPromise = sql`SELECT
        SUM(balance) AS "balance"
        FROM account`;
    const budgetStatusPromise = sql`SELECT
        SUM(amount) AS "amount"
        FROM budget`;

    const data = await Promise.all([
      // invoiceCountPromise,
      // customerCountPromise,
      // invoiceStatusPromise,
      incomeStatusPromise,
      expenseStatusPromise,
      accountStatusPromise,
      budgetStatusPromise,
    ]);

    // const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
    const totalIncomeAmount = formatCurrency(data[0].rows[0].amount ?? '0');
    const totalExpensesAmount = formatCurrency(data[1].rows[0].amount ?? '0');
    const totalAccountBalance = formatCurrency(data[2].rows[0].balance ?? '0');
    const totalBudgetAmount = formatCurrency(data[3].rows[0].amount ?? '0');

    // console.log('Data fetch completed after 3 seconds.');

    return {
      totalIncomeAmount,
      totalExpensesAmount,
      totalAccountBalance,
      totalBudgetAmount,
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
    const budget = await sql<BudgetTable>`
      SELECT
        budget.id,
        budget.amount,
        expense_category.name,
        expense_category.image_url
      FROM budget
      JOIN expense_category ON budget.category_id = expense_category.id
      ORDER BY expense_category.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    // const budget = await sql<BudgetTable>`
    //   SELECT
    //     budget.id,
    //     budget.amount,
    //     expense_category.name,
    //     expense_category.image_url
    //   FROM budget
    //   JOIN expense_category ON budget.category_id = expense_category.id
    //   WHERE
    //     expense_category.name ILIKE ${`%${query}%`} OR
    //     budget.amount ILIKE ${`%${query}%`}
    //   ORDER BY expense_category.name ASC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;

    return budget.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budgets.');
  }
}

export async function fetchBudgetPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
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
      FROM income_category
      ORDER BY name ASC
    `;

    const incomeCategories = data.rows;
    return incomeCategories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all income categories.');
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
      FROM expense_category
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
    throw new Error('Failed to fetch invoice.');
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
        name
      FROM account
      ORDER BY name ASC
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
        account.status
      FROM account
      ORDER BY account.status DESC, account.name ASC
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

/* Expenses */

export async function fetchFilteredExpenses(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const expenses = await sql<ExpensesTable>`
      SELECT
        expense.id,
        expense.date,
        expense.amount,
        expense.notes,
        expense.status,
        expense_category.name AS "category_name",
        expense_category.image_url AS "category_image_url",
        account.name AS "account_name"
      FROM expense
      JOIN expense_category ON expense.category_id = expense_category.id
      JOIN account ON expense.account_id = account.id
      WHERE DATE_TRUNC('month', expense.date) = DATE_TRUNC('month', CURRENT_DATE)
      ORDER BY expense.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return expenses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expenses.');
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
        expense.id,
        expense.date,
        expense.amount,
        expense.notes,
        expense.status,
        expense_category.id AS "category_id",
        account.id AS "account_id"
      FROM expense
      JOIN expense_category ON expense.category_id = expense_category.id
      JOIN account ON expense.account_id = account.id
      WHERE expense.id = ${id};
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
        income.id,
        income.date,
        income.amount,
        income.notes,
        income.status,
        income_category.name AS "category_name",
        income_category.image_url AS "category_image_url",
        account.name AS "account_name"
      FROM income
      JOIN income_category ON income.category_id = income_category.id
      JOIN account ON income.account_id = account.id
      WHERE DATE_TRUNC('month', income.date) = DATE_TRUNC('month', CURRENT_DATE)
      ORDER BY income.date DESC
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
    FROM income
    JOIN income_category ON income.category_id = income_category.id
    JOIN account ON income.account_id = account.id
    WHERE DATE_TRUNC('month', income.date) = DATE_TRUNC('month', CURRENT_DATE)
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
        income.id,
        income.date,
        income.amount,
        income.notes,
        income.status,
        income_category.id AS "category_id",
        account.id AS "account_id"
      FROM income
      JOIN income_category ON income.category_id = income_category.id
      JOIN account ON income.account_id = account.id
      WHERE income.id = ${id};
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
