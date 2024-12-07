import { useState } from 'react'
import TransactionsTable from './components/TransactionsTable';
import StatisticsCard from './components/StatisticsCard';
import BarChart from './components/BarChart';

const App = () => {
  const [month, setMonth] = useState('March');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <TransactionsTable month={month} setMonth={setMonth} />
      <StatisticsCard month={month} />
      <BarChart month={month} />
    </div>
  );
};

export default App;
