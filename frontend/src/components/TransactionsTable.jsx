// Handles month selection, search input, pagination.
// Displays transaction data

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../api/api';

const TransactionsTable = ({ month, setMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const perPage = 10;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/transactions', {
        params: { month, search, page, perPage },
      });
      setTransactions(res.data.transactions);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  const clearSearch = () => {
    setSearch('');
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction Dashboard</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search transaction"
            className="p-2 border rounded-lg"
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button onClick={clearSearch} className="p-2 bg-gray-300 rounded-lg">
              Clear
            </button>
          )}
        </div>
        <select
          className="p-2 border rounded-lg"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setPage(1);
          }}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-200 text-left">
        <thead>
          <tr>
            {['ID', 'Title', 'Description', 'Price', 'Category', 'Sold', 'Image'].map((header) => (
              <th key={header} className="border p-2 bg-yellow-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-100">
              <td className="border p-2">{t.id}</td>
              <td className="border p-2">{t.title}</td>
              <td className="border p-2">{t.description}</td>
              <td className="border p-2">${t.price.toFixed(2)}</td>
              <td className="border p-2">{t.category}</td>
              <td className="border p-2">{t.sold ? 'Yes' : 'No'}</td>
              <td className="border p-2">
                {t.image && <img src={t.image} alt={t.title} className="h-10 w-auto" />}
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <p>Page No: {page}</p>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => prev + 1)}
            className="p-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <p>Per Page: {perPage}</p>
      </div>
    </div>
  );
};

TransactionsTable.propTypes = {
  month: PropTypes.string.isRequired,
  setMonth: PropTypes.func.isRequired,
};

export default TransactionsTable;
