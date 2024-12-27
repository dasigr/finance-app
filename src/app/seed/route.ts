import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users, expenseCategories, budgets, accounts, expenses, incomeCategories, incomes } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

async function seedExpenseCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS expense_category (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedExpenseCategories = await Promise.all(
    expenseCategories.map(
      (expenseCategory) => client.sql`
        INSERT INTO expense_category (id, name, image_url)
        VALUES (${expenseCategory.id},${expenseCategory.name}, ${expenseCategory.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedExpenseCategories;
}

async function seedBudget() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS budget (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      amount INT NOT NULL
    );
  `;

  const insertedBudget = await Promise.all(
    budgets.map(
      (budget) => client.sql`
        INSERT INTO budget (category_id, amount)
        VALUES (${budget.category_id}, ${budget.amount})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedBudget;
}

async function seedAccounts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS account (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      balance INT NOT NULL,
      status BOOLEAN DEFAULT TRUE
    );
  `;

  const insertedAccounts = await Promise.all(
    accounts.map(
      (account) => client.sql`
        INSERT INTO account (id, name, balance, status)
        VALUES (${account.id}, ${account.name}, ${account.balance}, ${account.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedAccounts;
}

async function seedExpenses() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS expense (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      account_id UUID NOT NULL,
      date DATE NOT NULL,
      amount INT NOT NULL,
      notes VARCHAR(255),
      status BOOLEAN DEFAULT TRUE
    );
  `;

  const insertedExpenses = await Promise.all(
    expenses.map(
      (expense) => client.sql`
        INSERT INTO expense (category_id, account_id, date, amount, notes, status)
        VALUES (${expense.category_id}, ${expense.account_id}, ${expense.date}, ${expense.amount}, ${expense.notes}, ${expense.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedExpenses;
}

async function seedIncomeCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS income_category (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedIncomeCategories = await Promise.all(
    incomeCategories.map(
      (category) => client.sql`
        INSERT INTO income_category (id, name, image_url)
        VALUES (${category.id},${category.name}, ${category.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedIncomeCategories;
}

async function seedIncomes() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS income (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      account_id UUID NOT NULL,
      date DATE NOT NULL,
      amount INT NOT NULL,
      notes VARCHAR(255),
      status BOOLEAN DEFAULT TRUE
    );
  `;

  const insertedIncomes = await Promise.all(
    incomes.map(
      (income) => client.sql`
        INSERT INTO income (category_id, account_id, date, amount, notes, status)
        VALUES (${income.category_id}, ${income.account_id}, ${income.date}, ${income.amount}, ${income.notes}, ${income.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedIncomes;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    // await seedExpenseCategories();
    // await seedBudget();
    // await seedAccounts();
    // await seedExpenses();
    // await seedIncomeCategories();
    // await seedIncomes();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
