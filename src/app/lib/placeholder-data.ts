// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
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
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
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

export { users, customers, invoices, revenue, expenseCategories, budgets };
