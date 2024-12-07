//Fetches data from statistics, bar chart, and pie chart APIs and combines
const axios = require('axios');
const getMonthNumber = (monthName) => {
  return new Date(`${monthName} 1, 2022`).getMonth() + 1;
};

exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const baseURL = `http://localhost:${process.env.PORT || 5000}/api`;

    const [statsRes, barRes, pieRes] = await Promise.all([
      axios.get(`${baseURL}/statistics`, { params: { month } }),
      axios.get(`${baseURL}/bar-chart`, { params: { month } }),
      axios.get(`${baseURL}/pie-chart`, { params: { month } })
    ]);

    res.status(200).json({
      statistics: statsRes.data,
      barChart: barRes.data,
      pieChart: pieRes.data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get combined data', details: error.message });
  }
};