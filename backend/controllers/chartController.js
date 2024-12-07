const Transaction = require('../models/Transaction');

const getMonthNumber = (monthName) => {
  return new Date(`${monthName} 1, 2022`).getMonth() + 1;
};

exports.getBarChartData = async (req, res) => {
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);

  const priceRanges = [
    { label: '0-100', min: 0, max: 100 },
    { label: '101-200', min: 101, max: 200 },
    { label: '201-300', min: 201, max: 300 },
    { label: '301-400', min: 301, max: 400 },
    { label: '401-500', min: 401, max: 500 },
    { label: '501-600', min: 501, max: 600 },
    { label: '601-700', min: 601, max: 700 },
    { label: '701-800', min: 701, max: 800 },
    { label: '801-900', min: 801, max: 900 },
    { label: '901-above', min: 901, max: Infinity }
  ];

  try {
    const result = {};
    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        price: {
          $gte: range.min,
          ...(range.max !== Infinity && { $lte: range.max })
        }
      });
      result[range.label] = count;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bar chart data', details: error.message });
  }
};

exports.getPieChartData = async (req, res) => {
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);

  try {
    const data = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
      },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pie chart data', details: error.message });
  }
};