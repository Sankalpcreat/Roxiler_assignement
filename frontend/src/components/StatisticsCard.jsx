// Fetches and displays total sale, sold items, and not sold items for the selected month

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../api/api';

const StatisticsCard = ({ month }) => {
  const [stats, setStats] = useState({
    totalSale: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/statistics', { params: { month } });
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    if (month) {
      fetchStats();
    }
  }, [month]);

  return (
    <div className="p-4 bg-yellow-100 rounded-lg">
      <h2 className="text-xl font-bold">Statistics - {month}</h2>
      <div className="mt-2">
        <p><strong>Total Sale:</strong> ${stats.totalSale.toFixed(2)}</p>
        <p><strong>Total Sold Items:</strong> {stats.soldItems}</p>
        <p><strong>Total Not Sold Items:</strong> {stats.notSoldItems}</p>
      </div>
    </div>
  );
};


StatisticsCard.propTypes = {
  month: PropTypes.string.isRequired,
};

export default StatisticsCard;
