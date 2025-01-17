// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type IncomeCategoryTable = {
  id: string;
  name: string;
  image_url: string;
};

export type ExpenseCategoryTable = {
  id: string;
  name: string;
  image_url: string;
};

export type BudgetTable = {
  id: string;
  amount: number;
  category_id: string;
  category_name: string;
  category_image_url: string;
};

export type AccountsTable = {
  id: string;
  name: string;
  balance: number;
  status: boolean;
};

export type ExpensesTable = {
  id: string;
  date: string;
  category_name: string;
  category_image_url: string;
  account_name: string;
  notes: string;
  amount: number;
  status: boolean;
};

export type IncomesTable = {
  id: string;
  date: string;
  category_name: string;
  category_image_url: string;
  account_name: string;
  notes: string;
  amount: number;
  status: boolean;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type IncomeCategoryField = {
  id: string;
  name: string;
};

export type ExpenseCategoryField = {
  id: string;
  name: string;
};

export type AccountField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type IncomeCategoryForm = {
  id: string;
  name: string;
  image_url: string;
};

export type ExpenseCategoryForm = {
  id: string;
  name: string;
  image_url: string;
};

export type BudgetForm = {
  id: string;
  category_id: string;
  amount: number;
};

export type AccountForm = {
  id: string;
  name: string;
  balance: number;
  weight: number;
  status: boolean;
};

export type ExpenseForm = {
  id: string;
  date: string;
  category_id: string;
  account_id: string;
  amount: number;
  notes: string;
  status: boolean;
};

export type IncomeForm = {
  id: string;
  date: string;
  category_id: string;
  account_id: string;
  amount: number;
  notes: string;
  status: boolean;
};
