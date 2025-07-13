import PieChartCard from "./PieChartCard";


// Define the type for your mock data
interface Customer {
  id: number;
  name: string;
  amount: number;
  date: string;
}

const myCustomerData: Customer[] = [
  { id: 1, name: 'Alice Smith', amount: 1200000, date: '2025-04-01' },
  { id: 2, name: 'Bob Johnson', amount: 800000, date: '2025-04-01' },
  { id: 3, name: 'Charlie Brown', amount: 600000, date: '2025-04-01' },
  { id: 4, name: 'Diana Prince', amount: 400000, date: '2025-04-01' },
  { id: 5, name: 'Eve Adams', amount: 900000, date: '2025-04-08' },
  { id: 6, name: 'Frank White', amount: 700000, date: '2025-04-08' },

  { id: 7, name: 'Grace Lee', amount: 500000, date: '2025-04-08' },
  { id: 8, name: 'Hank Green', amount: 300000, date: '2025-04-08' },
  { id: 9, name: 'Ivy Black', amount: 200000, date: '2025-04-15' },
  { id: 10, name: 'Jack White', amount: 100000, date: '2025-04-15' },
  { id: 11, name: 'Alice Smith', amount: 1200000, date: '2025-04-01' },

  { id: 12, name: 'Bob Johnson', amount: 8000000, date: '2025-07-14' },
  { id: 13, name: 'Charlie Brown', amount: 6000000, date: '2025-07-14' },
  { id: 14, name: 'Diana Prince', amount: 4000000, date: '2025-07-14' },
  { id: 15, name: 'Eve Adams', amount: 9000000, date: '2025-07-14' },
  { id: 16, name: 'Frank White', amount: 700000, date: '2025-07-14' },
];

export default function TopPayingCustomerChart() {
  return <section>
    <PieChartCard customerData={myCustomerData} title="Top Paying Customers" />
  </section>;
}
