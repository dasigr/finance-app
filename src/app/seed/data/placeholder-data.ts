// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import { ledgers } from "./ledger";


const date = new Date();
const set_date = date.toISOString().split('T')[0];

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Test Engineer',
    email: 'test-engineer@a5project.com',
    password: 'T064vYL3LkZ9sGvB',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: set_date,
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: set_date,
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: set_date,
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: set_date,
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: set_date,
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: set_date,
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: set_date,
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const categories = [
  {
    id: 'df842f97-e8cc-40a7-880f-ced11fb0bcbc',
    user_id: users[0].id,
    name: 'Automobile',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'dfa5e265-1140-4747-b33a-5b8463b797e6',
    user_id: users[0].id,
    name: 'Business',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'f7c377d0-5db0-47ca-9b31-89e708dcdb5e',
    user_id: users[0].id,
    name: 'Crypto',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '6587db90-7c5c-4bbf-aa74-e3d12333f77e',
    user_id: users[0].id,
    name: 'Education',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'cf23b9f8-6750-40ef-affe-61307a5ec392',
    user_id: users[0].id,
    name: 'Electricity',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'cc4f5d54-ff54-4985-a4ca-70b003ed4b59',
    user_id: users[0].id,
    name: 'Entertainment',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '58d75bc8-f75f-411d-982f-d3b19c5261b0',
    user_id: users[0].id,
    name: 'Family',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '0894eb1a-d020-41f7-9bf4-2fba3596ae7a',
    user_id: users[0].id,
    name: 'Food & Drinks',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '395f725e-a51a-4b91-a81c-8f251828864e',
    user_id: users[0].id,
    name: 'Gasoline',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'b78553cf-e520-42a7-b25c-d67d7cee35a1',
    user_id: users[0].id,
    name: 'Gifts & Donations',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '24f9c04e-3b53-4f9a-987c-7dbcf3f58383',
    user_id: users[0].id,
    name: 'Groceries',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '1615f532-23fd-4bc2-bdf4-47081ada228f',
    user_id: users[0].id,
    name: 'Health & Fitness',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'fba9a259-42fb-4f7f-bc4b-74a536757ee4',
    user_id: users[0].id,
    name: 'Housing',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'b4daa82a-74e7-46d1-aa71-dac1bf3efe7c',
    user_id: users[0].id,
    name: 'Internet',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'ea912d96-8531-4952-95a8-fa295efdc65c',
    user_id: users[0].id,
    name: 'Medical',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '472b3cbe-4488-42a5-a942-e033dba62fdd',
    user_id: users[0].id,
    name: 'Other',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '510d61c3-a4b0-4d75-8b90-20413a3df998',
    user_id: users[0].id,
    name: 'Parking',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '405e7835-1ee0-4167-99b1-59bcbd40ad22',
    user_id: users[0].id,
    name: 'Shopping',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'cb6691c5-37e7-4494-b5d7-35cd51b4ce61',
    user_id: users[0].id,
    name: 'Utilities',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'c152de77-da38-46a1-a10e-79ca3d104d68',
    user_id: users[0].id,
    name: 'Water',
    type: 'expense',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'd768daf9-0db1-41d1-810a-86a9db58bf84',
    user_id: users[0].id,
    name: 'Salary',
    type: 'income',
    image_url: '/income-category/amy-burns.png'
  },
  {
    id: '40fbf367-c43b-43a5-943f-e1d2ed19317f',
    user_id: users[0].id,
    name: 'Part-time Work',
    type: 'income',
    image_url: '/income-category/balazs-orban.png'
  },
  {
    id: '403a4e53-d848-470f-80d5-534acbb4bf69',
    user_id: users[0].id,
    name: 'Personal Savings',
    type: 'income',
    image_url: '/income-category/delba-de-oliveira.png'
  },
  {
    id: '8ef0effc-9d58-451c-b51a-c7e588d90858',
    user_id: users[0].id,
    name: 'Rents and Royalties',
    type: 'income',
    image_url: '/income-category/evil-rabbit.png'
  },
  {
    id: '71972ed6-ddcc-4efb-8f37-d38ebb3e030c',
    user_id: users[0].id,
    name: 'Investments',
    type: 'income',
    image_url: '/income-category/lee-robinson.png'
  },
  {
    id: 'e7f842a5-d907-44f0-ba1d-933d2aef674f',
    user_id: users[0].id,
    name: 'Business',
    type: 'income',
    image_url: '/income-category/michael-novotny.png'
  },
  {
    id: '6e1cef31-4987-4d42-a0d1-079375085646',
    user_id: users[0].id,
    name: 'Other',
    type: 'income',
    image_url: '/income-category/balazs-orban.png'
  }
];

const expenseCategories = [
  {
    id: 'df842f97-e8cc-40a7-880f-ced11fb0bcbc',
    name: 'Automobile',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'dfa5e265-1140-4747-b33a-5b8463b797e6',
    name: 'Business',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'f7c377d0-5db0-47ca-9b31-89e708dcdb5e',
    name: 'Crypto',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '6587db90-7c5c-4bbf-aa74-e3d12333f77e',
    name: 'Education',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'cf23b9f8-6750-40ef-affe-61307a5ec392',
    name: 'Electricity',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'cc4f5d54-ff54-4985-a4ca-70b003ed4b59',
    name: 'Entertainment',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '58d75bc8-f75f-411d-982f-d3b19c5261b0',
    name: 'Family',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '0894eb1a-d020-41f7-9bf4-2fba3596ae7a',
    name: 'Food & Drinks',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '395f725e-a51a-4b91-a81c-8f251828864e',
    name: 'Gasoline',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'b78553cf-e520-42a7-b25c-d67d7cee35a1',
    name: 'Gifts & Donations',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '24f9c04e-3b53-4f9a-987c-7dbcf3f58383',
    name: 'Groceries',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '1615f532-23fd-4bc2-bdf4-47081ada228f',
    name: 'Health & Fitness',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'fba9a259-42fb-4f7f-bc4b-74a536757ee4',
    name: 'Housing',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'b4daa82a-74e7-46d1-aa71-dac1bf3efe7c',
    name: 'Internet',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'ea912d96-8531-4952-95a8-fa295efdc65c',
    name: 'Medical',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '472b3cbe-4488-42a5-a942-e033dba62fdd',
    name: 'Other',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '510d61c3-a4b0-4d75-8b90-20413a3df998',
    name: 'Parking',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: '405e7835-1ee0-4167-99b1-59bcbd40ad22',
    name: 'Shopping',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'cb6691c5-37e7-4494-b5d7-35cd51b4ce61',
    name: 'Utilities',
    image_url: '/expense-category/balazs-orban.png'
  },
  {
    id: 'c152de77-da38-46a1-a10e-79ca3d104d68',
    name: 'Water',
    image_url: '/expense-category/balazs-orban.png'
  },
];

// Name is not saved to database.
const budgets = [
  {
    category_id: expenseCategories[0].id,
    amount: 20000,
  },
  {
    category_id: expenseCategories[1].id,
    amount: 1500000,
  },
  { 
    category_id: expenseCategories[2].id,
    amount: 0,
  },
  { 
    category_id: expenseCategories[3].id,
    amount: 0,
  },
  { 
    category_id: expenseCategories[4].id,
    amount: 0,
  },
  { 
    category_id: expenseCategories[5].id,
    amount: 100000,
  },
  { 
    category_id: expenseCategories[6].id,
    amount: 100000,
  },
  { 
    category_id: expenseCategories[7].id,
    amount: 400000,
  },
  { 
    category_id: expenseCategories[8].id,
    amount: 100000,
  },
  { 
    category_id: expenseCategories[9].id,
    amount: 100000,
  },
  { 
    category_id: expenseCategories[10].id,
    amount: 600000,
  },
  { 
    category_id: expenseCategories[11].id,
    amount: 50000,
  },
  { 
    category_id: expenseCategories[12].id,
    amount: 1050000,
  },
  { 
    category_id: expenseCategories[13].id,
    amount: 420000,
  },
  { 
    category_id: expenseCategories[14].id,
    amount: 0,
  },
  { 
    category_id: expenseCategories[15].id,
    amount: 100000,
  },
  { 
    category_id: expenseCategories[16].id,
    amount: 0,
  },
  { 
    category_id: expenseCategories[17].id,
    amount: 100000,
  },
  { 
    category_id: expenseCategories[18].id,
    amount: 1100000,
  },
  { 
    category_id: expenseCategories[19].id,
    amount: 20000,
  },
];

const accounts = [
  {
    id: 'af9fdbca-312e-496e-a922-7958f918d13d',
    user_id: users[0].id,
    name: 'Wallet',
    type: 'cash',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 1
  },
  {
    id: '2e7924b0-535f-4af2-812f-a2ba6fbf6ad2',
    user_id: users[0].id,
    name: 'GCash',
    type: 'e-wallet',
    balance: 0,
    currency: 'PHP',
    weight: 1,
    status: 1
  },
  {
    id: '0ae2153f-c11d-42b0-aff6-d5e5f39cce97',
    user_id: users[0].id,
    name: 'UB',
    type: 'bank',
    balance: 0,
    currency: 'PHP',
    weight: 2,
    status: 1
  },
  {
    id: '7e5f95c2-9298-4361-b4d0-a4be007f6911',
    user_id: users[0].id,
    name: 'BPI',
    type: 'bank',
    balance: 0,
    currency: 'PHP',
    weight: 3,
    status: 1
  },
  {
    id: '5f0c5a94-5ff8-4380-b030-128e0f59aab2',
    user_id: users[0].id,
    name: 'MCC',
    type: 'credit card',
    balance: 0,
    currency: 'PHP',
    weight: 4,
    status: 1
  },
  {
    id: '4b9aaade-ad4b-48b6-b690-c0558c885d71',
    user_id: users[0].id,
    name: 'BCC',
    type: 'credit card',
    balance: 0,
    currency: 'PHP',
    weight: 5,
    status: 1
  },
  {
    id: '3dc459ee-7569-43cb-94ba-24e3e27d892f',
    user_id: users[0].id,
    name: 'Wise',
    type: 'e-wallet',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0
  },
  {
    id: '83ce7484-577f-4492-9bba-e6dbe4f76b77',
    user_id: users[0].id,
    name: 'Emergency Fund',
    type: 'bank',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0
  },
  {
    id: 'ecae60b7-a21b-43b9-85b9-1b41d3b13517',
    user_id: users[0].id,
    name: 'DJ Internet Cafe',
    type: 'cash',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0
  },
  {
    id: 'b7ce4e1a-68ab-40ad-8138-4ad63dea8b01',
    user_id: users[0].id,
    name: 'Trading 212',
    type: 'e-wallet',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0
  },
  {
    id: 'bd110ad3-f723-4fc5-8b56-c4f5ac3b6728',
    user_id: users[0].id,
    name: 'IBKR',
    type: 'e-wallet',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0
  },
  {
    id: '018dd564-dd44-4b52-967a-97620c6b057c',
    user_id: users[0].id,
    name: 'Gotrade',
    type: 'e-wallet',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0
  },
  {
    id: 'e8a381d0-8540-494b-b797-893353f6c877',
    user_id: users[0].id,
    name: 'PDAX',
    type: 'e-wallet',
    balance: 0,
    currency: 'PHP',
    weight: 0,
    status: 0 
  }
];

const expenses = [
  {
    category_id: expenseCategories[0].id,
    account_id: accounts[0].id,
    date: set_date,
    amount: 200000,
    notes: 'Item A',
    status: 1
  },
  {
    category_id: expenseCategories[1].id,
    account_id: accounts[1].id,
    date: set_date,
    amount: 200000,
    notes: 'Item B',
    status: 1
  },
  {
    category_id: expenseCategories[2].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 200000,
    notes: 'Item C',
    status: 1
  },
  {
    category_id: expenseCategories[3].id,
    account_id: accounts[3].id,
    date: set_date,
    amount: 200000,
    notes: 'Item D',
    status: 1
  },
  {
    category_id: expenseCategories[4].id,
    account_id: accounts[4].id,
    date: set_date,
    amount: 200000,
    notes: 'Item E',
    status: 1
  },
  {
    category_id: expenseCategories[0].id,
    account_id: accounts[0].id,
    date: set_date,
    amount: 200000,
    notes: 'Item F',
    status: 1
  },
  {
    category_id: expenseCategories[5].id,
    account_id: accounts[5].id,
    date: set_date,
    amount: 200000,
    notes: 'Item G',
    status: 1
  },
  {
    category_id: expenseCategories[6].id,
    account_id: accounts[6].id,
    date: set_date,
    amount: 200000,
    notes: 'Item H',
    status: 1
  },
  {
    category_id: expenseCategories[7].id,
    account_id: accounts[7].id,
    date: set_date,
    amount: 200000,
    notes: 'Item I',
    status: 1
  },
  {
    category_id: expenseCategories[8].id,
    account_id: accounts[8].id,
    date: set_date,
    amount: 200000,
    notes: 'Item J',
    status: 1
  },
  {
    category_id: expenseCategories[9].id,
    account_id: accounts[9].id,
    date: set_date,
    amount: 200000,
    notes: 'Item K',
    status: 1
  },
  {
    category_id: expenseCategories[10].id,
    account_id: accounts[10].id,
    date: set_date,
    amount: 200000,
    notes: 'Item L',
    status: 1
  },
  {
    category_id: expenseCategories[0].id,
    account_id: accounts[0].id,
    date: set_date,
    amount: 200000,
    notes: 'Item M',
    status: 1
  },
  {
    category_id: expenseCategories[1].id,
    account_id: accounts[1].id,
    date: set_date,
    amount: 200000,
    notes: 'Item N',
    status: 1
  },
  {
    category_id: expenseCategories[2].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 200000,
    notes: 'Item 0',
    status: 1
  }
];

const incomeCategories = [
  {
    id: 'd768daf9-0db1-41d1-810a-86a9db58bf84',
    name: 'Salary',
    image_url: '/income-category/amy-burns.png'
  },
  {
    id: '40fbf367-c43b-43a5-943f-e1d2ed19317f',
    name: 'Part-time Work',
    image_url: '/income-category/balazs-orban.png'
  },
  {
    id: '403a4e53-d848-470f-80d5-534acbb4bf69',
    name: 'Personal Savings',
    image_url: '/income-category/delba-de-oliveira.png'
  },
  {
    id: '8ef0effc-9d58-451c-b51a-c7e588d90858',
    name: 'Rents and Royalties',
    image_url: '/income-category/evil-rabbit.png'
  },
  {
    id: '71972ed6-ddcc-4efb-8f37-d38ebb3e030c',
    name: 'Investments',
    image_url: '/income-category/lee-robinson.png'
  },
  {
    id: 'e7f842a5-d907-44f0-ba1d-933d2aef674f',
    name: 'Business',
    image_url: '/income-category/michael-novotny.png'
  },
  {
    id: '6e1cef31-4987-4d42-a0d1-079375085646',
    name: 'Other',
    image_url: '/income-category/balazs-orban.png'
  }
];

const incomes = [
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '28th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 8000000,
    notes: '15th Salary',
    status: 1
  },
  {
    category_id: incomeCategories[0].id,
    account_id: accounts[2].id,
    date: set_date,
    amount: 7000000,
    notes: '30th Salary',
    status: 1
  }
];

const transfer_ledger = [
  {
    date: set_date,
    from_account_id: accounts[2].id,
    to_account_id: accounts[1].id,
    amount: 1000000,
    notes: 'Transfer from UB',
    status: 1
  },
  {
    date: set_date,
    from_account_id: accounts[1].id,
    to_account_id: accounts[0].id,
    amount: 1000000,
    notes: 'Transfer to Wallet',
    status: 1
  }
]

const income_ledger = [
  {
    date: set_date,
    account_id: accounts[1].id,
    category_id: incomeCategories[0].id,
    amount: 500000,
    notes: 'Income from Side Project',
    status: 1
  }
]

const expense_ledger = [
  {
    date: set_date,
    account_id: accounts[1].id,
    category_id: expenseCategories[0].id,
    amount: 10000,
    notes: 'Bread',
    status: 1
  }
]

export { 
  users, 
  customers, 
  invoices, 
  revenue, 
  categories,
  expenseCategories, 
  budgets, 
  accounts,
  expense_ledger,
  expenses,
  incomeCategories,
  income_ledger,
  incomes,
  ledgers
};
