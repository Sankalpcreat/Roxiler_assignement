// Fetches bar chart data for the selected month
// displays a chart of the price ranges

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import axios from '../api/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState({});

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        if (!month) {
          console.error('Month prop is missing!');
          return;
        }
        const res = await axios.get('/bar-chart', { params: { month } });
        setBarData(res.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarData();
  }, [month]);

  
  const labels = barData ? Object.keys(barData) : [];
  const dataPoints = barData ? Object.values(barData) : [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Items per Price Range',
        data: dataPoints,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Bar Chart Stats - ${month || 'Unknown Month'}`,
      },
    },
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg mt-4">
      {labels.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data available for {month}</p>
      )}
    </div>
  );
};


BarChart.propTypes = {
  month: PropTypes.string.isRequired,
};

export default BarChart;
